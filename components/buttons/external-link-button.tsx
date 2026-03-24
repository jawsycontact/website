import type {ReactNode} from "react";
import * as React from "react";
import Link from "next/link";
import {Button, buttonVariants} from "@/components/ui/button";
import {LuExternalLink} from "react-icons/lu";
import {SiGithub, SiLinkedin, SiInstagram} from "react-icons/si";
import type {VariantProps} from "class-variance-authority";
import type {IconType} from "react-icons";

type IconRule = {
    matches: Array<string | RegExp>;
    icon: ReactNode;
};

type IconRegistry = {
    rules: IconRule[];
    defaultIcon: ReactNode;
};

const ICON_CLASSNAME = "h-4 w-4";

function makeIcon(Icon: IconType) {
    return <Icon className={ICON_CLASSNAME} />;
}

const defaultIconRegistry: IconRegistry = {
    rules: [
        {
            matches: ["github.com"],
            icon: makeIcon(SiGithub),
        },
        {
            matches: ["linkedin.com"],
            icon: makeIcon(SiLinkedin),
        },
        {
            matches: ["instagram.com"],
            icon: makeIcon(SiInstagram),
        }
    ],
    defaultIcon: makeIcon(LuExternalLink),
};

interface ExternalLinkButtonProps
    extends React.ComponentProps<"button">,
        VariantProps<typeof buttonVariants> {
    href: string;
    iconRegistry?: IconRegistry;
    showText?: boolean;
    children?: ReactNode;
}

function getIconForUrl(url: string, iconRegistry: IconRegistry) {
    for (const rule of iconRegistry.rules) {
        const matches = rule.matches.some((match) =>
            typeof match === "string" ? url.includes(match) : match.test(url),
        );

        if (matches) {
            return rule.icon;
        }
    }

    return iconRegistry.defaultIcon;
}

export function ExternalLinkButton({
    href,
    iconRegistry = defaultIconRegistry,
    showText = false,
    children,
    variant = "default",
    size = "default",
    ...props
}: ExternalLinkButtonProps) {
    const icon = getIconForUrl(href, iconRegistry);

    return (
        <Button
            asChild
            variant={variant}
            size={size}
            {...props}
        >
            <Link
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
            >
                {icon}
                {showText && children}
            </Link>
        </Button>
    );
}
