import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

CustomEase.create("ease-primary", "0.62, 0.05, 0.01, 0.99");
CustomEase.create("ease-secondary", "0.16, 1, 0.35, 1");

export const duration = 1.2;
export const staggerAmount = 0.2;
export const easePrimary = "ease-primary";
export const easeSecondary = "ease-secondary";
