import { useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/app/theme-provider";

export function ThemeModeToggle() {
  const storageKey = "vite-ui-theme";
  const { setTheme } = useTheme();
  const [mode, setMode] = useState(localStorage.getItem(storageKey));

  function toggleHandler() {
    // Toggle order: System > Light > Dark
    switch (mode) {
      case "system":
        setTheme("light");
        setMode("light");
        console.log(mode)
        return;
      case "light":
        setTheme("dark");
        setMode("dark");
        console.log(mode)
        return;
      case "dark":
        setTheme("system");
        setMode("system");
        console.log(mode)
        return;
      default:
        return;
    }
  }

  function opacity(current_mode: string) {
    if(current_mode == mode){
      return '100'
    }
    return '0'
  }

  function position(current_mode: string) {
    switch(mode){
      case 'system':
        switch(current_mode){
          case 'light':
            return 'top-[-15px]'
          case 'dark':
            return 'top-[29px]'
          default:
            return 'top-[7px]'
        }
      case 'light':
        switch(current_mode){
          case 'dark':
            return 'top-[-15px]'
          case 'system':
            return 'top-[29px]'
          default:
            return 'top-[7px]'
        }
      case 'dark':
        switch(current_mode){
          case 'system':
            return 'top-[-15px]'
          case 'light':
            return 'top-[29px]'
          default:
            return 'top-[7px]'
        }
    }
  }

  return (
    <>
      <Button variant="outline" size="icon" onClick={toggleHandler} className="relative overflow-hidden">
        <Monitor className={`absolute h-[1.2rem] w-[1.2rem] transition-all opacity-${opacity('system')} ${position('system')}`} />
        <Sun className={`absolute h-[1.2rem] w-[1.2rem] transition-all opacity-${opacity('light')} ${position('light')}`} />
        <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-all opacity-${opacity('dark')} ${position('dark')}`} />
        
        <span className="sr-only">Toggle theme</span>
      </Button>
    </>
  );
}
