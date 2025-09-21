# 🌐 REST Client Application

This is the final team project for the **REACT 2025 Q3** course at **Rolling Scopes School**, developed by [**Konstantin Petrov**](https://github.com/petruse4ka), [**Daniil Biver**](https://github.com/tearzday) and [**Nataliia Shmatenko**](https://github.com/NatashaSolntseva) under the mentorship of [**Marharyta Malets**](https://github.com/margaryta-maletz) and [**Helena Krasnova**](https://github.com/helenakrasnova).

Our team develops a comprehensive and feature-rich 🌐 **REST Client Application** that provides developers with a powerful tool for testing and interacting with APIs. The platform offers an intuitive interface for making HTTP requests, managing request history, and handling variables, all while maintaining security through user authentication and providing internationalization support.

The main features of the application include:

- 🔐 **User Authentication** via Firebase with email/password
- 🌍 **Internationalization (i18n)** supporting multiple languages with language toggle
- 📡 **RESTful Client** with method selection, endpoint input, headers, and body editors
- 📝 **Request History & Analytics** with detailed metrics and request restoration
- 🔧 **Variables Management** with local storage support and template syntax
- 📊 **Generated Code** supporting multiple programming languages (cURL, JavaScript, Python, Java, C#, Go)
- 🚨 **Error Handling** with user-friendly error messages and HTTP status code display
- 📱 **Responsive Design** ensuring optimal experience across all devices

---

## 🎥 Video Presentation

Watch our project presentation to see the REST Client App in action:

- **[Long Presentation](https://youtu.be/rY_P35rI7p0)** - Detailed walkthrough with timestamps
- **[Short Presentation](https://youtu.be/2-f-0gEJSAk)** - 2x speed version of the long presentation

### 📋 Presentation Timestamps

- **Introduction** - 00:00
- **Main Route** - 00:50
- **Sign In / Sign Up** - 1:40
- **Restful Client** - 2:40
- **History and Analytics** - 5:53
- **Variables** - 8:45
- **General Requirements** - 10:55
- **Outro** - 12:22

---

## 📄 Key Pages

- 🏠 **Main Page** - Welcome page with authentication status and navigation
- 🔐 **Sign In / Sign Up** - User authentication with validation
- 📡 **REST Client** - HTTP request interface with method selection and response handling
- 📝 **History & Analytics** - Request history with metrics and restoration capabilities
- 🔧 **Variables** - Environment variables management with template syntax support

---

## 💻 Technology Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)  
**HTML5** – Used for structuring the content following modern web standards.

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)  
**TypeScript** – Used for enhancing JavaScript with static typing to improve code quality.

![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=black)  
**React** – Used for building interactive user interfaces with component-based architecture.

![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)  
**Next.js** – Used as the React framework for production with server-side rendering and static site generation.

![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=white)  
**Tailwind CSS** – Used for building modern and responsive UI with a utility-first approach.

![Vitest](https://img.shields.io/badge/Vitest-6E9F18?logo=vitest&logoColor=white)  
**Vitest** – Used for unit testing, ensuring high-quality, bug-free code.

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?logo=eslint&logoColor=white)  
**ESLint** – Used for enforcing coding standards and catching errors early during development.

![Prettier](https://img.shields.io/badge/Prettier-F7B93E?logo=prettier&logoColor=white)  
**Prettier** – Used for ensuring consistent code style across the entire project.

![Husky](https://img.shields.io/badge/Husky-4E8CAB?logo=husky&logoColor=white)  
**Husky** – Used for automating code checks before commits.

![Ant Design](https://img.shields.io/badge/Ant%20Design-0170FE?logo=antdesign&logoColor=white)  
**Ant Design** – Used for providing high-quality React UI components and design system.

![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)  
**Vercel** – Used for continuous deployment and hosting with optimal performance.

---

## 🚀 Project setup

Follow these steps to set up and run the project locally.

### Basic requirements

Make sure to have the following installed:

- [Node.js](https://nodejs.org/) version: **22.x** or higher
- [npm](https://www.npmjs.com/)

Verify installation by running in the console:

```bash
node -v
npm -v
```

### Setup Instructions

1. **Open the console and clone the repository**

```bash
git clone https://github.com/petruse4ka/rest-client-app.git
```

This will create the new folder with all the files from the repository.

2. **Navigate to the project directory**

```bash
cd rest-client-app
```

3. **Install project dependencies**

```bash
npm install
```

This will install all packages listed in `package.json`.

4. **Initialize Husky for Git hooks**

```bash
npm run prepare
```

This will set up Husky to run the Git hooks for pre-commit and other automation.

5. **Start the development server**

```bash
npm run dev
```

This will launch the Next.js development server to test that the project has been setup correctly.

> ⚠️ **Important:** If your IDE shows TypeScript-related errors, make sure to check not only the installed TypeScript version but also the TypeScript configuration in your IDE. For **Visual Studio Code** select the TypeScript version by either:
>
> - Clicking the TypeScript version number in the bottom right corner and choosing "Use Workspace Version"
> - Or using the Command Palette (Ctrl+Shift+P or Cmd+Shift+P) and selecting "TypeScript: Select TypeScript Version" → "Use Workspace Version"

## 🎨 Tailwind CSS Development Setup

### VS Code Extensions

To enhance your development experience with Tailwind CSS, install the following extension:

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Tailwind CSS IntelliSense"
4. Click Install

This extension provides:

- Autocomplete suggestions
- Linting
- Hover previews

> ⚠️ **Important:** Make sure to open the project as a separate workspace in VS Code (File → Open Folder → select project folder) to ensure that the workspace-specific Tailwind CSS settings are properly applied. Opening the project as a subfolder of another workspace will not apply the correct settings.

### Font Configuration

To add new fonts to the project:

1. Import the font in `src/app/layout.tsx` using Next.js font optimization:

```typescript
import { Inter, Roboto } from 'next/font/google';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
});
```

2. Add the font variable to the body className in `src/app/layout.tsx`:

```typescript
<body className={`${inter.variable} ${roboto.variable} antialiased`}>
```

3. Configure the font in Tailwind theme in `src/app/globals.css`:

```css
@theme inline {
  --font-inter: var(--font-inter);
  --font-roboto: var(--font-roboto);
}
```

4. Use the font in the components:

```typescript
<div className="font-inter">
  This text uses the Inter font
</div>
```

### Color Configuration

To add custom colors to the project:

1. Configure the colors in Tailwind theme in `src/app/globals.css`:

```css
@theme inline {
  --color-accent: #e7426a;
  --color-primary: #f7ebe5;
  --color-secondary: #4e9dd3;
}
```

2. Use the colors in the components:

```typescript
<div className="bg-accent border-secondary hover:bg-primary">
  This div uses custom colors
</div>
```

---

## 📜 Scripts

Use the following scripts to assist with development, formatting, linting, building, and deploying.

### 🧹 Code Quality Scripts

| Script                  | Description                                                                                                                                                                 |
| :---------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run lint`          | Execute ESLint on all files in the project to check for code quality issues.                                                                         |
| `npm run lint:fix`      | Execute ESLint and automatically fix all fixable issues on `.ts`, `.tsx`, `.js`, and `.jsx` files in the `src/` folder.                                                    |
| `npm run format`        | Execute Prettier on all `.js`, `.jsx`, `.ts`, `.tsx`, `.json`, `.css`, `.scss`, and `.md` files in the `src/` folder to format and fix all fixable issues. |

### ✅ Testing

| Script                  | Description                                                                         |
| :---------------------- | :---------------------------------------------------------------------------------- |
| `npm run test`          | Execute unit tests using Vitest.                                                    |
| `npm run test:coverage` | Execute unit tests using Vitest and view coverage info.                             |

### ⚙️ Development & Deployment

| Script            | Description                                 |
| :---------------- | :------------------------------------------ |
| `npm run dev`     | Start a local development server with Next.js using Turbopack. |
| `npm run build`   | Build the project for production using Turbopack.           |
| `npm run start`   | Start the production server.       |

### 🛡️ Git Hooks

| Script               | Description                                               |
| :------------------- | :-------------------------------------------------------- |
| `npm run prepare`    | Set up Husky hooks.                                       |
| `npm run pre-commit` | Run linting and formatting on staged files before commit using lint-staged. |

---

## 🌿 Branch Naming Rules

To maintain consistency across the project, follow the branch naming conventions below:

- **New feature:**  
  `feature/feature-name`  
  _Example:_ `feature/add-authentication`, `feature/rest-client-interface`, `feature/request-history`

- **Bugfix:**  
  `bugfix/issue-description`  
  _Example:_ `bugfix/fix-theme-switch-hydration`, `bugfix/cors-error-handling`, `bugfix/response-parsing`

- **Refactor:**  
  `refactor/component-or-module-name`  
  _Example:_ `refactor/theme-context`, `refactor/api-client`, `refactor/error-handling`

---

## 📝 Commit Naming Rules

Please use **clear, structured commit messages** following these prefixes:

- **`feat:`** – for implementing a new feature  
  _Example:_ `feat: add authentication with Firebase`, `feat: implement request history tracking`

- **`fix:`** – for fixing a bug in existing functionality  
  _Example:_ `fix: resolve theme switch hydration mismatch`, `fix: handle CORS errors properly`

- **`refactor:`** – for optimizing, cleaning, or changing code structure without changing functionality  
  _Example:_ `refactor: improve theme context structure`, `refactor: optimize API client code`

- **`docs:`** – for documentation updates or improvements  
  _Example:_ `docs: update README with REST client features`, `docs: add API testing guide`

- **`test:`** – for adding or improving tests  
  _Example:_ `test: add unit tests for theme context`, `test: add integration tests for API client`

- **`chore:`** – for minor maintenance tasks that don't affect files or tests  
  _Example:_ `chore: update dependencies`, `chore: configure ESLint rules`

Ensure all commit messages follow this format to maintain consistency throughout the project. For other prefixes, check the **[convention documentation](https://www.conventionalcommits.org/en/v1.0.0/)** to ensure proper usage.

---

## 🏗️ Project Structure

This project follows the **Feature-Sliced Design (FSD)** methodology combined with **Next.js** App Router structure.

### FSD + Next.js Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalization routes
│   │   ├── auth/          # Authentication pages
│   │   ├── rest-client/   # REST client page
│   │   ├── history/       # Request history page
│   │   ├── variables/     # Variables page
│   │   ├── layout.tsx     # Locale layout
│   │   └── page.tsx       # Home page
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── shared/                # Reusable functionality
│   ├── ui/               # UI components
│   ├── lib/              # Libraries and utilities
│   └── utils/            # Utility functions
├── entities/              # Business entities
│   ├── user/             # User entity
│   └── request/          # Request entity
├── features/              # User interactions
│   ├── auth/             # Authentication feature
│   ├── api-client/       # API client feature
│   ├── theme-toggle/     # Theme switching feature
│   └── language-switch/  # Language switching feature
└── widgets/               # Composite UI blocks
    ├── header/           # Header widget
    └── footer/           # Footer widget
```

### FSD Layers

- **`app/`** - Next.js App Router with internationalization routes (`[locale]`)
- **`shared/`** - Reusable code used across the application
- **`entities/`** - Business entities (User, Request, etc.)
- **`features/`** - User interactions and business logic
- **`widgets/`** - Composite UI blocks combining features and entities

For more information about Feature-Sliced Design, visit: [Feature-Sliced Design Documentation](https://feature-sliced.design/ru/docs/get-started/overview)

---

## 📁 File Naming Rules

### General Guidelines

- Use **kebab-case** for all file and folder names.
- Use **lowercase letters** and **hyphens** to separate words.
- Keep names **meaningful and descriptive**.
- **Avoid spaces** and **special characters** in file names.

### Examples

```
- user-authentication.ts
- api-client-service.ts
- request-history.tsx
- theme-context.ts
- rest-client-interface.tsx
```

---

## 🔠 Enums/Constants Naming Rules

### General Guidelines

- Use **PascalCase** for enum names.
- Use **UPPER_CASE** for enum members and constants.
- Keep names **meaningful and clear**.
- **Avoid abbreviations** unless widely recognized.
- **Separate words with underscores** when necessary.

### Example Enums

```typescript
enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
}

enum RequestStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
  TIMEOUT = 'timeout',
}
```

### Example Constants

```typescript
const MAX_RETRIES = 3;
const API_BASE_URL = 'https://api.example.com';
const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection lost',
  PERMISSION_DENIED: 'You do not have permission to perform this action',
  INVALID_PASSWORD: 'The provided credentials are incorrect',
};
```

---

### 🧪 Testing Rules

Follow these guidelines for writing tests:

- Use **BDD (Behavior-Driven Development)** style with `describe` and `test`
- Group related tests under `describe` blocks
- Write test descriptions that read like technical specifications:
  ```typescript
  describe('User Authentication', () => {
    test('should accept valid credentials', () => {
      // test code
    });
    test('should reject invalid password', () => {
      // test code
    });
  });
  ```

---

## 👥 Team Members

- [**Daniil Biver**](https://github.com/tearzday) - Student  
  Discord: @tearzday
- [**Nataliia Shmatenko**](https://github.com/NatashaSolntseva) - Student  
  Discord: @ultranata.
- [**Konstantin Petrov**](https://github.com/petruse4ka) - Student  
  Discord: @petrusja
- [**Marharyta Malets**](https://github.com/margaryta-maletz) - Mentor
- [**Helena Krasnova**](https://github.com/helenakrasnova) - Mentor

---

## ✨ Special Acknowledgements

- [**Marharyta Malets**](https://github.com/margaryta-maletz) — Our incredible mentor and lecturer. Her dedication to organizing our learning process, providing continuous support, and delivering valuable feedback guided us throughout the React 2025 Q3 course. Her expertise in project management and encouragement were vital in helping us grow our knowledge, keep our spirits high and stay fully focused till the end of the course.
- [**Helena Krasnova**](https://github.com/helenakrasnova) — Our amazing mentor and knowledge provider, whose deep technical expertise and unwavering support helped us navigate the complex challenges of the React 2025 Q3 course. Her insights into modern web development practices and encouragement were instrumental in our learning journey and project development.
- [**Rolling Scopes School**](https://rs.school/) — For providing an outstanding learning platform, and to all the organizers, coordinators, mentors, moderators, activists, and fellow students of the React 2025 Q3 course for creating an inspiring and supportive community.
