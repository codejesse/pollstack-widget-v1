import {Button} from "@/components/ui/button.jsx";
import {Label} from "@/components/ui/label.jsx"
import {Input} from "@/components/ui/input.jsx"
import {Textarea} from "@/components/ui/textarea.jsx";

export const Widget = () => {
    return (
        <div className="fixed bottom-4 right-4 z-50">
            <Button className="rounded-full hover:scale-105 transform transition-all ease-in-out">Give us feedback</Button>
            <div className="space-y-2">
                <h3>Send us your feedback</h3>
                <form>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Enter your name"/>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="Enter a valid email"/>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="feedback">Feedback</Label>
                        <Textarea id="feedback" placeholder="What do you think?" className="min-h-[100px]"/>
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </div>
        </div>
    )
}