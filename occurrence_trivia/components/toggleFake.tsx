'use client'
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react";

interface ToggleFakeProps {
  onToggle: (value: boolean) => void;
}

export default function ToggleFake({onToggle}: ToggleFakeProps) {

  const [checked, setChecked] = useState(false); // Local state to manage the switch

  const handleSwitchChange = (checked: boolean) => {
    setChecked(checked);
    onToggle(checked); // Send the checked state to the parent component
  };

  return (
    <div className="flex items-center space-x-2 my-2">
      <Switch checked={checked} onCheckedChange={handleSwitchChange}  />
      <Label htmlFor="fake-picture-toggle" className="text-lg">Fake Picture</Label>
    </div>
  )
}