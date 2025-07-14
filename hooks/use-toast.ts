"use client"

// Inspired by react-hot-toast library - Updated for Dashboard Theme
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

const TOAST_LIMIT = 3 // Increased to show more toasts
const TOAST_REMOVE_DELAY = 3000 // 3 seconds auto-dismiss

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId)
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id)
        })
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

// Enhanced toast function with theme-specific variants
function toast({ ...props }: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  // Auto-dismiss after delay
  addToRemoveQueue(id)

  return {
    id: id,
    dismiss,
    update,
  }
}

// Theme-specific toast variants
toast.success = (props: Toast) => {
  return toast({ ...props, variant: "default" }) // Using default variant
}

toast.error = (props: Toast) => {
  return toast({ ...props, variant: "destructive" })
}

toast.warning = (props: Toast) => {
  return toast({ ...props, variant: "default" }) // Using default variant
}

toast.info = (props: Toast) => {
  return toast({ ...props, variant: "default" }) // Using default variant
}

// Loading toast with auto-dismiss
toast.loading = (props: Toast) => {
  const { id, dismiss, update } = toast({ 
    ...props, 
    variant: "default",
    title: props.title || "Loading...",
    description: props.description || "Please wait"
  })

  const success = (successProps: Toast) => {
    update({
      ...successProps,
      variant: "default",
      id
    })
  }

  const error = (errorProps: Toast) => {
    update({
      ...errorProps,
      variant: "destructive",
      id
    })
  }

  return { id, dismiss, update, success, error }
}

// Dashboard-specific toast messages
toast.productLoaded = (count: number) => {
  return toast.success({
    title: "Products Loaded",
    description: `Successfully loaded ${count} products`,
  })
}

toast.productError = (error?: string) => {
  return toast.error({
    title: "Error Loading Products",
    description: error || "Failed to load products. Please try again.",
  })
}

toast.authSuccess = (action: "login" | "logout") => {
  return toast.success({
    title: action === "login" ? "Welcome Back!" : "Logged Out",
    description: action === "login" ? "You have been successfully logged in" : "You have been successfully logged out",
  })
}

toast.authError = (error?: string) => {
  return toast.error({
    title: "Authentication Error",
    description: error || "Please check your credentials and try again.",
  })
}

toast.dataRefresh = () => {
  return toast.info({
    title: "Data Refreshed",
    description: "Your dashboard data has been updated",
  })
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

export { useToast, toast }