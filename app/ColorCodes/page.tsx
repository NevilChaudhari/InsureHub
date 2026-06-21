'use client'

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

interface ColorItem {
    name: string;
    hex: string;
}

interface ColorGroup {
    title: string;
    subtitle?: string;
    colors: ColorItem[];
}

const colorGroups: ColorGroup[] = [
    {
        title: "Primary Colors",
        colors: [
            { name: "Primary Blue", hex: "#2563EB" },
            { name: "Dark Blue", hex: "#1D4ED8" },
            { name: "Hover Blue", hex: "#3B82F6" },
            { name: "Light Blue", hex: "#DBEAFE" },
        ],
    },
    {
        title: "Sidebar Colors",
        colors: [
            { name: "Sidebar Background", hex: "#021B3A" },
            { name: "Sidebar Secondary", hex: "#0A2348" },
            { name: "Active Menu Item", hex: "#2563EB" },
            { name: "Sidebar Border", hex: "#12305D" },
            { name: "Sidebar Text", hex: "#FFFFFF" },
            { name: "Sidebar Muted Text", hex: "#94A3B8" },
        ],
    },
    {
        title: "Background Colors",
        colors: [
            { name: "Main Background", hex: "#F8FAFC" },
            { name: "Card Background", hex: "#FFFFFF" },
            { name: "Table Background", hex: "#FFFFFF" },
            { name: "Section Background", hex: "#F1F5F9" },
        ],
    },
    {
        title: "Text Colors",
        colors: [
            { name: "Primary Text", hex: "#0F172A" },
            { name: "Secondary Text", hex: "#475569" },
            { name: "Muted Text", hex: "#64748B" },
            { name: "Placeholder Text", hex: "#94A3B8" },
            { name: "White Text", hex: "#FFFFFF" },
        ],
    },
    {
        title: "Success Colors",
        subtitle: "Used for Active Contracts, Approved Claims, Active Agents",
        colors: [
            { name: "Success Green", hex: "#22C55E" },
            { name: "Dark Success", hex: "#16A34A" },
            { name: "Light Success", hex: "#DCFCE7" },
        ],
    },
    {
        title: "Warning Colors",
        subtitle: "Used for Pending Claims",
        colors: [
            { name: "Warning Orange", hex: "#F59E0B" },
            { name: "Dark Warning", hex: "#D97706" },
            { name: "Light Warning", hex: "#FEF3C7" },
        ],
    },
    {
        title: "Danger Colors",
        subtitle: "Used for Rejected Claims, Expired Contracts",
        colors: [
            { name: "Danger Red", hex: "#EF4444" },
            { name: "Dark Danger", hex: "#DC2626" },
            { name: "Light Danger", hex: "#FEE2E2" },
        ],
    },
    {
        title: "Info Colors",
        subtitle: "Used for In Review status",
        colors: [
            { name: "Info Blue", hex: "#3B82F6" },
            { name: "Dark Info", hex: "#2563EB" },
            { name: "Light Info", hex: "#DBEAFE" },
        ],
    },
    {
        title: "Borders & Dividers",
        colors: [
            { name: "Card Border", hex: "#E2E8F0" },
            { name: "Table Border", hex: "#CBD5E1" },
            { name: "Divider", hex: "#E5E7EB" },
        ],
    },
];

const getTextColor = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    return luminance > 0.65 ? "#0F172A" : "#FFFFFF";
};

const hexToRgb = (hex: string): string => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgb(${r}, ${g}, ${b})`;
};

const ColorCodes: React.FC = () => {
    const [copied, setCopied] = useState<string>("");

    const copyColor = async (hex: string): Promise<void> => {
        try {
            await navigator.clipboard.writeText(hex);
            setCopied(hex);

            setTimeout(() => {
                setCopied("");
            }, 2000);
        } catch (error) {
            console.error("Failed to copy color:", error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">

            {/* Content */}
            <div className="mx-auto max-w-7xl px-6 py-10">
                <div className="space-y-14">
                    {colorGroups.map((group) => (
                        <section key={group.title}>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-slate-900">
                                    {group.title}
                                </h2>

                                {group.subtitle && (
                                    <p className="mt-1 text-sm text-slate-500">
                                        {group.subtitle}
                                    </p>
                                )}
                            </div>

                            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {group.colors.map((color) => (
                                    <div
                                        key={`${group.title}-${color.hex}`}
                                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    >
                                        <div
                                            className="relative flex h-44 items-center justify-center"
                                            style={{ backgroundColor: color.hex }}
                                        >
                                            <div
                                                className="rounded-full px-4 py-2 text-sm font-semibold backdrop-blur-md"
                                                style={{
                                                    color: getTextColor(color.hex),
                                                    backgroundColor: "rgba(255,255,255,0.25)",
                                                }}
                                            >
                                                {color.name}
                                            </div>
                                        </div>

                                        <div className="p-5">
                                            <h3 className="truncate text-lg font-semibold text-slate-900">
                                                {color.name}
                                            </h3>

                                            <div className="mt-4 space-y-2">
                                                <div className="rounded-lg bg-slate-100 px-3 py-2 text-sm">
                                                    <span className="font-medium text-slate-500">
                                                        HEX:
                                                    </span>{" "}
                                                    <span className="font-mono">{color.hex}</span>
                                                </div>

                                                <div className="rounded-lg bg-slate-100 px-3 py-2 text-sm">
                                                    <span className="font-medium text-slate-500">
                                                        RGB:
                                                    </span>{" "}
                                                    <span className="font-mono">
                                                        {hexToRgb(color.hex)}
                                                    </span>
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => copyColor(color.hex)}
                                                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                                            >
                                                {copied === color.hex ? (
                                                    <>
                                                        <Check size={18} />
                                                        Copied
                                                    </>
                                                ) : (
                                                    <>
                                                        <Copy size={18} />
                                                        Copy Color
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ColorCodes;