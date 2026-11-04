import { useEffect, useState, useRef } from "react";
import type { AlertBody, AlertIcon } from "../types";
import { emitter } from "@/lib/emitter";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { InfoIcon, CheckCircle2Icon, AlertTriangleIcon, X } from "lucide-react";

export function setAlert(
  title: string,
  description: string = "",
  icon: AlertIcon = "info",
  ttl: number = 3000,
) {
  const alert: AlertBody = {
    icon: icon,
    title: title,
    description: description,
    ttl: ttl,
  };
  emitter.emit("alert", alert);
}

function AlertIcon({ icon }: { icon: string }) {
  switch (icon) {
    case "success":
      return <CheckCircle2Icon />;
    case "danger":
      return <AlertTriangleIcon />;
    default:
      return <InfoIcon />;
  }
}

export default function AlertComponent() {
  const [alert, setAlert] = useState<AlertBody>({
    title: "",
    icon: "info",
    description: "",
    ttl: 0,
  });
  const [visible, setVisible] = useState(false);
  const visibilityTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function updateAlert(new_alert: AlertBody) {
    if (visibilityTimer.current) {
      clearTimeout(visibilityTimer.current);
    }
    setAlert(new_alert);
    setVisible(true);
    visibilityTimer.current = setTimeout(() => {
      setVisible(false);
    }, new_alert.ttl);
    emitter.off("alert", (e) => updateAlert(e as AlertBody));
  }

  useEffect(() => {
    emitter.on("alert", (e) => updateAlert(e as AlertBody));
  }, []);

  return (
    <>
      <div
        className={`absolute right-2 bottom-2 transition-opacity opacity-${visible ? "100" : "0"}`}
      >
        <Alert
          variant={alert.icon == "danger" ? "destructive" : "default"}
          className="min-h-20 min-w-70"
        >
          <AlertIcon icon={alert.icon} />
          <AlertTitle>{alert.title}</AlertTitle>
          <AlertDescription>{alert.description}</AlertDescription>
          <AlertAction className="top-0 right-0">
            <Button variant="ghost" size="icon" onClick={() => setVisible(false)}>
              <X/>
            </Button>
          </AlertAction>
        </Alert>
      </div>
    </>
  );
}
