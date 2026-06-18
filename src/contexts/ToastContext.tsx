import {
  createContext,
  useContext,
  useState,
  useRef,
  useCallback,
  ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";

type ToastType = "success" | "error" | "info" | "warning";

type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const MAX_TOASTS = 3;
const DURATION = 7000;

const toastIcons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="w-5 h-5 text-white" />,
  error: <XCircle className="w-5 h-5 text-white" />,
  info: <Info className="w-5 h-5 text-white" />,
  warning: <AlertTriangle className="w-5 h-5 text-white" />,
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // timers + tracking
  const timers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});
  const startTime = useRef<Record<number, number>>({});
  const remaining = useRef<Record<number, number>>({});

  const removeToast = useCallback((id: number) => {
    clearTimeout(timers.current[id]);
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = "info") => {
      const id = Date.now();

      startTime.current[id] = Date.now();
      remaining.current[id] = DURATION;

      setToasts((prev) => {
        const updated = [...prev, { id, message, type }];
        return updated.slice(-MAX_TOASTS);
      });

      const startTimer = (toastId: number, delay: number) => {
        timers.current[toastId] = setTimeout(() => {
          removeToast(toastId);
        }, delay);
      };

      startTimer(id, DURATION);
    },
    [removeToast]
  );

  const pauseToast = (id: number) => {
    clearTimeout(timers.current[id]);

    const elapsed = Date.now() - startTime.current[id];
    remaining.current[id] -= elapsed;
  };

  const resumeToast = (id: number) => {
    startTime.current[id] = Date.now();

    timers.current[id] = setTimeout(() => {
      removeToast(id);
    }, remaining.current[id]);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed top-4 left-1/2 -translate-x-1/2 flex flex-col space-y-3 z-[999] w-full px-4 items-center">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 100) {
                  removeToast(toast.id);
                }
              }}
              onMouseEnter={() => pauseToast(toast.id)}
              onMouseLeave={() => resumeToast(toast.id)}
              className={`
                relative overflow-hidden cursor-pointer
                w-full max-w-sm px-4 py-3 rounded-xl shadow-lg
                text-sm font-medium backdrop-blur-md border border-white/10
                flex items-center justify-center gap-2 text-white select-none

                ${
                  toast.type === "success"
                    ? "bg-gradient-to-r from-green-500/80 to-emerald-500/80"
                    : toast.type === "error"
                    ? "bg-gradient-to-r from-red-500/80 to-pink-500/80"
                    : toast.type === "warning"
                    ? "bg-gradient-to-r from-yellow-500/80 to-amber-500/80"
                    : "bg-gradient-to-r from-blue-500/80 to-sky-500/80"
                }
              `}
            >
              {/* icon + message */}
              {toastIcons[toast.type]}
              <span>{toast.message}</span>

              {/* progress bar */}
              <div className="absolute bottom-0 left-0 h-[3px] w-full bg-white/20">
                <div className="h-full bg-white/70 animate-[shrink_3s_linear_forwards]" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
};