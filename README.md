This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Modern React App with Dock Navigation

This project demonstrates a modern React application built with Next.js, Tailwind CSS, and shadcn/ui components. The main feature is a floating dock navigation component that provides a sleek, macOS-inspired navigation experience.

## Features

- **Floating Dock Navigation**: A customizable dock component that floats at the bottom of the page
- **Theme Switching**: Support for light, dark, and system themes
- **Responsive Design**: Works on all screen sizes
- **Modern UI Components**: Built with shadcn/ui and Tailwind CSS
- **Animations**: Smooth animations using Framer Motion

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/components/ui/dock-two.tsx`: The core dock component with animations
- `src/components/DockNavigation.tsx`: Navigation wrapper for the dock
- `src/context/ThemeContext.tsx`: Theme management
- `src/app/*`: Page components for different sections

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
