'use client';

import {useEffect, useRef} from "react";
import { useChat } from 'ai/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Chat() {
    const { messages, input, handleInputChange, handleSubmit } = useChat();

    const chatContainerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
    }

    useEffect(() => {
        scrollToBottom();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <Card className="w-[600px] mt-4">
            <CardHeader>
                <CardTitle>AI ChatBot</CardTitle>
                <CardDescription>An interface using Next.js to interact with the OpenAI API.</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea ref={chatContainerRef} className="h-[600px] w-full pr-4 flex flex-col">
                    {messages.map(message => (
                        <div
                            key={message.id}
                            className={cn("flex gap-3 text-slate-600 text-sm mb-4", {
                                'flex-row-reverse': message.role === 'user',
                                'flex-row': message.role === 'assistant',
                            })}
                        >
                            {message.role === 'user' && (
                                <Avatar>
                                    <AvatarFallback>WB</AvatarFallback>
                                    <AvatarImage src="https://github.com/bassalobre.png" />
                                </Avatar>
                            )}
                            {message.role === 'assistant' && (
                                <Avatar>
                                    <AvatarFallback>AI</AvatarFallback>
                                </Avatar>
                            )}
                            <p className="leading-relaxed">{message.content}</p>
                        </div>
                    ))}
                </ScrollArea>
            </CardContent>
            <CardFooter>
                <form className="w-full flex gap-2" onSubmit={handleSubmit}>
                    <Input
                        placeholder="How can I help you?"
                        value={input}
                        onChange={handleInputChange}
                    />
                    <Button type="submit">Send</Button>
                </form>
            </CardFooter>
        </Card>
    );
}