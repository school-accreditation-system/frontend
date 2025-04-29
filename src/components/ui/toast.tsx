"use client";

import * as React from "react";

import { Check, X, AlertTriangle, XCircle } from "lucide-react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

interface ToastContextValue {
  setHasDescription: (value: boolean) => void;
}

const ToastContext = React.createContext<ToastContextValue | undefined>(
  undefined
);

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed top-0 right-0 z-[200] flex max-h-screen w-full flex-col-reverse p-4 sm:w-fit sm:max-w-[600px] sm:min-w-[400px]",
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded border p-4 shadow-md transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      status: {
        info: "border-l-[6px] border-l-blue-500 bg-white text-gray-900",
        success: "border-l-[6px] border-l-green-500 bg-white text-gray-900",
        warning: "border-l-[6px] border-l-amber-500 bg-white text-gray-900",
        error: "border-l-[6px] border-l-red-500 bg-white text-gray-900",
      },
    },
    defaultVariants: {
      status: "success",
    },
  }
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, status = "success", children, ...props }, ref) => {
  const [hasDescription, setHasDescription] = React.useState(false);
  return (
    <ToastContext.Provider value={{ setHasDescription }}>
      <ToastPrimitives.Root
        ref={ref}
        className={cn(toastVariants({ status }), className)}
        {...props}
      >
        <div
          className={`flex ${
            hasDescription ? "items-start" : "items-center"
          } gap-3 w-full pr-8`}
        >
          <div
            className={cn(
              "rounded-lg w-7 h-7 flex-shrink-0 flex items-center justify-center",
              {
                "border border-green-200 bg-green-50": status === "success",
                "border border-amber-200 bg-amber-50": status === "warning",
                "border border-blue-200 bg-blue-50": status === "info",
                "border border-red-200 bg-red-50": status === "error",
              }
            )}
          >
            <div
              className={cn(
                "rounded-full w-4 h-4 flex items-center justify-center",
                {
                  "bg-green-500": status === "success",
                  "bg-amber-500": status === "warning",
                  "bg-blue-500": status === "info",
                  "bg-red-500": status === "error",
                }
              )}
            >
              {status === "warning" ? (
                <AlertTriangle className="w-3 h-3 text-white font-bold" />
              ) : status === "error" ? (
                <XCircle className="w-3 h-3 text-white font-bold" />
              ) : status === "info" ? (
                <AlertTriangle className="w-3 h-3 text-white font-bold" />
              ) : (
                <Check className="w-3 h-3 text-white font-bold" />
              )}
            </div>
          </div>
          <div className="flex-grow">{children}</div>
        </div>
      </ToastPrimitives.Root>
    </ToastContext.Provider>
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 text-gray-400 opacity-0 transition-opacity hover:text-gray-900 focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-sm font-semibold text-gray-900", className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => {
  const context = React.useContext(ToastContext);

  React.useEffect(() => {
    if (context) {
      context.setHasDescription(true);
      return () => context.setHasDescription(false);
    }
  }, [context]);

  return (
    <ToastPrimitives.Description
      ref={ref}
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  );
});
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
