'use client';

import '@ant-design/v5-patch-for-react-19';
import { RocketOutlined } from '@ant-design/icons';
import { Button, Input, Switch, message } from 'antd';
import { ThemeContext } from '@/context/theme-context';
import { useState, useEffect } from 'react';
import getDefaultTheme from '@/shared/utils/get-default-theme';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Theme } from '@/types/types';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/shared/config/firebase';
import { FirebaseError } from 'firebase/app';

export default function Home() {
  const [theme, setTheme] = useState<Theme>('light');

  //Sign Up Playground
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp(): Promise<void> {
    try {
      setLoading(true);
      const res = await createUserWithEmailAndPassword(auth, email, password);
      message.success(`Created: ${res.user.email ?? res.user.uid}`);
      setPassword('');
    } catch (err: unknown) {
      const code = err instanceof FirebaseError ? err.code : undefined;
      message.error(code ?? 'Error');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    setTheme(getDefaultTheme());
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeChange = (checked: boolean) => {
    setTheme(checked ? 'dark' : 'light');
  };

  return (
    <ThemeContext value={{ theme, setTheme }}>
      <div className="font-inter relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100 p-8 dark:from-zinc-900 dark:to-zinc-800">
        <main className="mx-auto max-w-2xl text-center">
          <div className="mb-8">
            <RocketOutlined style={{ fontSize: '4rem', color: '#d97706' }} className="mb-4" />
          </div>
          <h1 className="mb-6 text-4xl leading-relaxed font-bold text-zinc-800 md:text-6xl dark:text-zinc-100">
            Something Great is Coming
          </h1>
          <p className="mb-8 text-xl text-zinc-600 dark:text-zinc-300">
            We are building an amazing REST client application that will revolutionize how you test
            and interact with APIs.
          </p>
          <Switch
            checked={theme === 'dark'}
            onChange={handleThemeChange}
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
          />
          {/* Sign Up Playground */}
          <div className="mt-4 grid gap-3">
            <Input
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="large"
            />
            <Input.Password
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              size="large"
            />
            <Button type="primary" size="large" onClick={handleSignUp} loading={loading} block>
              Sign Up
            </Button>
          </div>
        </main>
      </div>
    </ThemeContext>
  );
}
