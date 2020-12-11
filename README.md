# EcommercePriceMonitor

## Frontend

### Install Angular

1. Install node.js
2. Run `npm install -g @angular/cli` in command prompt or terminal

### Development server

1. Open `Frontend` folder in your prefered IDE
2. Run `npm install` (only once when setting up project)
3. Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Backend

### Project Configuration

1. Open `Backend` folder in PyCharm Professional
2. Add configuration for Flask server
3. Install packages mentioned in requirements.txt file
4. Create a folder called `config` under `Backend` folder
5. Paste the firebase key under the `config` folder
6. Create a file called `.env` under `config` folder and add following content
```
EMAIL_ID=email-address@gmail.com
EMAIL_PASSWORD=password
```
