"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  function onSubmit(values: Schema) {
    axios
      .post("http://localhost:8080/v1/auth/login", values)
      .then((response) => {
        toast.success("Вход выполнен успешно");
        let token = response.data.body;
        localStorage.setItem("token", token);
        router.push("/workspaces");
      })
      .catch(({ response }) => toast.error(response.data.body.message));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 w-[400px]"
      >
        <header className="flex flex-col gap-2">
          <h1 className="font-bold text-4xl text-foreground">Вход</h1>
          <h3 className="text-light">Заполните форму, чтобы войти.</h3>
        </header>
        <main className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Введите адрес эл. почты"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Введите пароль"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-foreground">
                  Забыли пароль?{" "}
                  <Link className="underline" href="#">
                    Восстановить
                  </Link>
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </main>
        <Button size="lg" type="submit">
          Войти
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs font-bold">
            <span className="bg-white px-2 text-light">
              Или войдите с помощью других сервисов
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline">
            <GitHubLogoIcon />
          </Button>
          <Button variant="outline">
            <GitHubLogoIcon />
          </Button>
        </div>
        <div className="self-center flex gap-2 text-foreground">
          Нет аккаунта?
          <Link className="underline" href={"/register"}>
            Зарегистрироваться
          </Link>
        </div>
      </form>
    </Form>
  );
}

const schema = z.object({
  password: z
    .string()
    .min(6, { message: "Пароль должен содержать миниму 6 символов" }),
  email: z.string().email({ message: "Некорректный email" }),
});

type Schema = z.infer<typeof schema>;

export default LoginForm;
