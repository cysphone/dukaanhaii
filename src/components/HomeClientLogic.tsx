"use client";

import { useEffect } from "react";

export default function HomeClientLogic() {
    useEffect(() => {
        // Custom cursor
        const cursor = document.getElementById("cursor");
        const ring = document.getElementById("cursorRing");
        let mx = 0,
            my = 0,
            rx = 0,
            ry = 0;
        let animationFrameId: number;

        const onMouseMove = (e: MouseEvent) => {
            mx = e.clientX;
            my = e.clientY;
            if (cursor) {
                cursor.style.transform = `translate(${mx - 7}px, ${my - 7}px)`;
            }
        };

        document.addEventListener("mousemove", onMouseMove);

        function animateRing() {
            rx += (mx - rx - 19) * 0.12;
            ry += (my - ry - 19) * 0.12;
            if (ring) {
                ring.style.transform = `translate(${rx}px, ${ry}px)`;
            }
            animationFrameId = requestAnimationFrame(animateRing);
        }
        animateRing();

        const onMouseEnter = () => {
            if (cursor) cursor.style.transform += " scale(1.8)";
            if (ring) ring.style.opacity = "0.3";
        };

        const onMouseLeave = () => {
            if (ring) ring.style.opacity = "0.6";
        };

        const interactables = document.querySelectorAll("a, button");
        interactables.forEach((el) => {
            el.addEventListener("mouseenter", onMouseEnter);
            el.addEventListener("mouseleave", onMouseLeave);
        });

        // Sticky nav
        const nav = document.getElementById("nav");
        const onScroll = () => {
            if (nav) {
                nav.classList.toggle("scrolled", window.scrollY > 50);
            }
        };
        window.addEventListener("scroll", onScroll);

        // Scroll reveal
        const reveals = document.querySelectorAll(".reveal");
        const obs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("visible");
                        obs.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.12 }
        );
        reveals.forEach((el) => obs.observe(el));

        // Animated counter
        function animateCount(el: Element, target: number, suffix = "") {
            let start = 0;
            const duration = 1800;
            const step = (timestamp: number) => {
                if (!start) start = timestamp;
                const progress = Math.min((timestamp - start) / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(ease * target).toLocaleString("en-IN") + suffix;
                if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
        }

        // Using a ref or distinct class to avoid multiple observation issues
        const statObs = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        const nums = document.querySelectorAll(".stat-num");
                        if (nums.length > 1) {
                            animateCount(nums[1], 10000, "+");
                        }
                        statObs.disconnect();
                    }
                });
            },
            { threshold: 0.5 }
        );
        const statsEl = document.querySelector(".hero-stats");
        if (statsEl) statObs.observe(statsEl);

        // Cleanup function
        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            interactables.forEach((el) => {
                el.removeEventListener("mouseenter", onMouseEnter);
                el.removeEventListener("mouseleave", onMouseLeave);
            });
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(animationFrameId);
            obs.disconnect();
            statObs.disconnect();
        };
    }, []);

    return null;
}
