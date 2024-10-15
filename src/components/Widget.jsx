import {Button} from "@/components/ui/button.jsx";
import {Label} from "@/components/ui/label.jsx"
import {Input} from "@/components/ui/input.jsx"
import {Textarea} from "@/components/ui/textarea.jsx";
import {useState} from "react";

export const Widget = () => {
    const [rating, setRating] = useState(3);

    const onSelectStar = (index) => {
        setRating(index + 1);
    };

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
                    <div className="flex gap-1 mt-2">
                        {[...Array(5)].map((_, index) => (
                            <StarIcon
                                key={index}
                                className={`h-5 w-5 cursor-pointer ${
                                    rating > index ? "fill-primary" : "fill-muted stroke-muted-foreground"
                                }`}
                                onClick={() => onSelectStar(index)}
                            />
                        ))}
                    </div>
                    <Button className="cursor-not-allowed" type="button" variant="outlined"><CameraIcon /></Button>
                    <Button className="mt-4" type="submit">Submit</Button>
                </form>
            </div>
        </div>
    )
}

function StarIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
    )
}

function CameraIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/>
            <circle cx="12" cy="13" r="3"/>
        </svg>
    )
}