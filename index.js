#!/usr/bin/env node
const { execSync } = require('child_process')
const fs = require('fs')
const path = require('path')
const readline = require('readline')
const process = require('process')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Uygulama adını kullanıcıya soruyoruz
const askAppName = async () => {
  return new Promise(resolve => {
    rl.question(
      '📌 Enter the name of your React Native application: ',
      appName => {
        resolve(appName.trim())
      }
    )
  })
}

const createApp = async () => {
  const APP_NAME = (await askAppName()) || 'MyApp'

  const appPath = `./Desktop/${APP_NAME}`
  rl.close()

  if (fs.existsSync(appPath)) {
    // Eğer aynı isimden proje oluşturulduysa o proje dizinine geçiyoruz
    process.chdir(`./Desktop/${APP_NAME}`)
    console.log(`Changed directory to ${APP_NAME}`)

    return true
  }

  fs.mkdirSync(appPath, { recursive: true })
  console.log(`Created folder: ${appPath}`)

  const command = `cd Desktop && npx react-native init ${APP_NAME}`
  console.log(`Running: ${command}`)
  execSync(command, { stdio: 'inherit' })
  console.log('App created successfully!')

  // Proje dizinine geçiyoruz
  process.chdir(`./Desktop/${APP_NAME}`)
  console.log(`Changed directory to ${APP_NAME}`)
}

const installDependencies = async () => {
  const dependencies = [
    '@react-navigation/native',
    'react-native-screens',
    'react-native-safe-area-context',
    '@react-navigation/native-stack'
  ]

  const command = `npm install ${dependencies.join(' ')}`
  const pod = 'cd ios && pod install && cd ..'
  console.log(`Running: ${command}`)
  execSync(command, { stdio: 'inherit' })
  console.log('Dependencies installed successfully!')

  console.log(`Pod install: ${pod}`)
  execSync(pod, { stdio: 'inherit' })
  console.log('Pod installed successfully!')
}

const createStructure = async () => {
  const folders = ['src', 'src/screens', 'src/navigation']

  folders.forEach(folder => {
    const dirPath = path.join(process.cwd(), folder)
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
      console.log(`Created folder: ${dirPath}`)
    }
  })
}

const createFiles = async () => {
  const fileStructure = {
    // App.tsx
    'App.tsx': require('./templates/App'),

    // Screens
    'src/screens/Home.js': require('./templates/screens/Home'),

    // Navigation
    'src/navigation/RootNavigator.js': require('./templates/navigation/RootNavigator')
  }

  Object.entries(fileStructure).forEach(([filePath, content]) => {
    const dir = path.dirname(filePath)

    // Klasörleri oluşturuyoruz
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
      console.log(`Created folder: ${dir}`)
    }

    // Dosyayı oluşturup içeriği ekliyoruz
    fs.writeFileSync(filePath, content.trim())
    console.log(`Created file: ${filePath}`)
  })
}

const openVSCode = async () => {
  const command = `code .`
  console.log(`Running: ${command}`)
  execSync(command, { stdio: 'inherit' })
  console.log('Opened VSCode')
}

const run = async () => {
  try {
    await createApp()
    await installDependencies()
    await createStructure()
    await createFiles()
    await openVSCode()
  } catch (error) {
    console.log('------------------------------------')
    console.log('FAILED')
    console.log(error)
    console.log('------------------------------------')
  }
}

run()
