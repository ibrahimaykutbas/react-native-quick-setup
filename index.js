#!/usr/bin/env node
const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const process = require("process");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const askAppName = async () => {
  return new Promise((resolve) => {
    rl.question(
      "📌 Enter the name of your React Native application: ",
      (appName) => {
        resolve(appName.trim());
      }
    );
  });
};

const createApp = async () => {
  const APP_NAME = (await askAppName()) || "MyApp";

  const CURRENT_PATH = process.cwd();
  const APP_PATH = `${CURRENT_PATH}/${APP_NAME}`
  rl.close();

  if (fs.existsSync(APP_PATH)) {
    // Eğer aynı isimden proje oluşturulduysa o proje dizinine geçiyoruz
    process.chdir(APP_PATH);
    console.log(`Changed directory to ${APP_NAME}`);

    return true;
  }

  fs.mkdirSync(APP_PATH, { recursive: true });
  console.log(`Created folder: ${APP_PATH}`);

  const command = `npx react-native init ${APP_NAME}`;

  console.log(`Running: ${command}`);
  execSync(command, { stdio: "inherit" });
  console.log("App created successfully!");

  // Proje dizinine geçiyoruz
  process.chdir(APP_PATH)
  console.log(`Changed directory to ${APP_NAME}`);
};

const installDependencies = async () => {
  const dependencies = [
    "@react-navigation/native",
    "react-native-screens",
    "react-native-safe-area-context",
    "@react-navigation/native-stack",
    "@react-navigation/bottom-tabs",
    "react-redux",
    "@reduxjs/toolkit",
    "react-native-device-info",
    "react-native-svg",
    "react-native-svg-transformer",
    "react-native-mmkv",
  ];

  const command = `npm install ${dependencies.join(" ")}`;
  const pod = "cd ios && pod install && cd ..";

  console.log(`Running: ${command}`);
  execSync(command, { stdio: "inherit" });
  console.log("Dependencies installed successfully!");

  console.log(`Pod install: ${pod}`);
  execSync(pod, { stdio: "inherit" });
  console.log("Pod installed successfully!");
};

const createStructure = async () => {
  const folders = ["src", "src/screens", "src/navigation"];

  folders.forEach((folder) => {
    const dirPath = path.join(process.cwd(), folder);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Created folder: ${dirPath}`);
    }
  });
};

const createFiles = async () => {
  const fileStructure = {
    // App
    "App.tsx": require("./templates/App"),

    // Screens
    "src/screens/Auth/SplashScreen.js": require("./templates/screens/Auth/SplashScreen"),
    "src/screens/App/Home.js": require("./templates/screens/App/Home"),

    // Components
    "src/components/Button.js": require("./templates/components/Button"),
    "src/components/Input.js": require("./templates/components/Input"),

    // Navigation
    "src/navigation/routes.js": require("./templates/navigation/routes"),
    "src/navigation/RootNavigator.js": require("./templates/navigation/RootNavigator"),
    "src/navigation/AuthNavigator.js": require("./templates/navigation/AuthNavigator"),
    "src/navigation/AppNavigator.js": require("./templates/navigation/AppNavigator"),

    // Redux
    "src/redux/store.js": require("./templates/redux/store"),
    "src/redux/slice.js": require("./templates/redux/slice"),

    // Root
    "metro.config.js": require("./templates/metro.config"),

    // Assets
    "src/assets/icons/add.svg": require("./templates/assets/icons/add"),
    "src/assets/icons/back.svg": require("./templates/assets/icons/back.js"),
    "src/assets/icons/close.svg": require("./templates/assets/icons/close"),
    "src/assets/icons/home.svg": require("./templates/assets/icons/home-fill.js"),
    "src/assets/icons/home-fill.svg": require("./templates/assets/icons/home-fill"),
    "src/assets/icons/eye-open.svg": require("./templates/assets/icons/eye-open.js"),
    "src/assets/icons/eye-close.svg": require("./templates/assets/icons/eye-close.js"),
    "src/assets/icons/heart.svg": require("./templates/assets/icons/heart.js"),
    "src/assets/icons/heart-fill.svg": require("./templates/assets/icons/heart-fill.js"),
  };

  Object.entries(fileStructure).forEach(([filePath, content]) => {
    const dir = path.dirname(filePath);

    // Klasörleri oluşturuyoruz
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created folder: ${dir}`);
    }

    // Dosyayı oluşturup içeriği ekliyoruz
    fs.writeFileSync(filePath, content.trim());
    console.log(`Created file: ${filePath}`);
  });
};

const openVSCode = async () => {
  const command = `code .`;

  console.log(`Running: ${command}`);
  execSync(command, { stdio: "inherit" });
  console.log("Opened VSCode");
};

const run = async () => {
  try {
    await createApp();
    await installDependencies();
    await createStructure();
    await createFiles();
    await openVSCode();
  } catch (error) {
    console.log("------------------------------------");
    console.log("FAILED");
    console.log(error);
    console.log("------------------------------------");
  } finally {
    console.log("🎉 All operations completed successfully!");
    console.log("💻 Happy coding!");
  }
};

run();
