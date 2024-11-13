'use client';

import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconWand,
  IconSparkles,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";
import ASLTeacher from "@/components/ASLTeacher";
import Character from "@/components/Character";
import Translate from "@/components/Translate";
import SpeechToSign from "@/components/SpeechToSign";
import Settings from "@/components/Settings";

export default function SidebarDemo() {
  const links = [
    {
      label: "Dashboard",
      id: "dashboard",
      icon: (
        <IconUserBolt className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Transcribe ASL",
      id: "speech",
      icon: (
        <IconWand className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Translate ASL",
      id: "translate",
      icon: (
        <IconSparkles className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      id: "settings",
      icon: (
        <IconSettings className="text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];

  const [open, setOpen] = useState(false);
  const [currentView, setCurrentView] = useState("dashboard");
  const { user } = useUser();

  const handleLinkClick = (id) => {
    setCurrentView(id);
  };

  const renderContent = () => {
    switch (currentView) {
      case "dashboard":
        return <Character />;
      case "speech":
        return <SpeechToSign />;
      case "translate":
        return <Translate />;
      case "settings":
        return <Settings />;
      default:
        return <Content title="Dashboard" />;
    }
  };

  return (
    <div className="rounded-md flex w-full flex-col md:flex-row bg-neutral-800 flex-1 mx-auto border border-neutral-700 overflow-hidden h-screen">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink 
                  key={idx} 
                  link={{...link, href: "#"}} 
                  onClick={() => handleLinkClick(link.id)}
                />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: `${user?.firstName} ${user?.lastName}`,
                href: "#",
                icon: (
                  <UserButton />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}
export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image src="/signverse.png" alt="logo" width={50} height={50} />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-white whitespace-pre"
      >
        SignVerse
      </motion.span>
    </Link>
  );
};
export const LogoIcon = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <Image src="/signverse.png" alt="logo" width={50} height={50} />
    </Link>
  );
};

// Dummy dashboard component with content
const Content = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {[...new Array(4)].map((i) => (
            <div
              key={"first-array" + i}
              className="h-20 w-full rounded-lg bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((i) => (
            <div
              key={"second-array" + i}
              className="h-full w-full rounded-lg bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
