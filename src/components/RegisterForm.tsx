"use client";

import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

function RegisterForm() {
  const form = useForm<Schema>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      username: "",
      first_name: "",
      last_name: "",
      email: "",
    },
  });
  const router = useRouter();

  function onSubmit(values: Schema) {
    axios
      .post("http://localhost:8080/v1/auth/register", values)
      .then((response) => {
        toast.success("Аккаунт успешно создан");
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
          <h1 className="font-bold text-4xl text-foreground">Регистрация</h1>
          <h3 className="text-light">
            Заполните форму, чтобы создать аккаунт.
          </h3>
        </header>
        <main className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold text-light">
              Персональные данные
            </span>
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Введите ваше имя"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Введите вашу фамилию"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-bold text-light">Аккаунт</span>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Введите имя пользователя"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                      placeholder="Повторите пароль"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </main>
        <Button type="submit">Зарегистрироваться</Button>
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
          Уже есть аккаунт?
          <Link className="underline" href={"/login"}>
            Войти
          </Link>
        </div>
      </form>
    </Form>
  );
}

const schema = z.object({
  username: z
    .string()
    .min(2, { message: "Имя пользователя должно содержать минимум 2 символа" })
    .max(16, {
      message: "Имя пользователя не должно содержать более 16 символов",
    }),
  password: z
    .string()
    .min(6, { message: "Пароль должен содержать миниму 6 символов" }),
  email: z.string().email({ message: "Некорректный email" }),
  first_name: z
    .string()
    .min(2, { message: "Имя должно содержать минимум 2 символа" })
    .max(64, { message: "Имя не должно содержать более 54 символов" }),
  last_name: z
    .string()
    .min(2, { message: "Фамилия должно содержать минимум 2 символа" })
    .max(64, { message: "Фамилия не должно содержать более 54 символов" }),
});

type Schema = z.infer<typeof schema>;

export default RegisterForm;
