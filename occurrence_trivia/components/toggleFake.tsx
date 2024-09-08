import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export default function ToggleFake() {
  return (
    <div className="flex items-center space-x-2 my-2">
      <Switch className=""/>
      <Label htmlFor="fake-picture-toggle">Fake Picture</Label>
    </div>
  )
}