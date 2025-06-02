import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: "autoUpdate",
			includeAssets: [
				"favicon.svg",
				"favicon.ico",
				"robots.txt",
				"apple-touch-icon.png",
			],
			manifest: {
				name: "Mishmarot",
				short_name: "Mishmarot",
				description: "Mishmarot is an app for managing shifts",
				theme_color: "#ffffff",
				icons: [
					{
						src: "web-app-manifest-192x192.png",
						sizes: "192x192",
						type: "image/png",
					},
					{
						src: "web-app-manifest-512x512.png",
						sizes: "512x512",
						type: "image/png",
					},
				],
			},
		}),
	],
});
