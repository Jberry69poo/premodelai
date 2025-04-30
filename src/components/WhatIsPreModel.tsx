import React from "react";
import { motion } from "framer-motion";
import { Eye, Check, Camera, PaintBucket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export const WhatIsPreModel = () => {
  const fadeIn = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };
  const staggerChildren = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  return <section className="py-16 md:py-24 bg-gradient-to-b from-background to-card/30 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-[0.05] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')]" />
      <div className="container max-w-[1400px] mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-24 items-center">
          {/* Left side: Image and visualization */}
          <motion.div className="w-full md:w-1/2 relative" initial="hidden" whileInView="visible" viewport={{
          once: true,
          margin: "-100px"
        }} variants={fadeIn}>
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 p-4 md:p-6 rounded-xl">
                <div className="aspect-video bg-gradient-to-r from-primary/30 to-primary/10 rounded-lg flex items-center justify-center">
                  <div className="text-center px-8 md:px-12">
                    <PaintBucket className="h-12 w-12 md:h-16 md:w-16 text-primary mx-auto mb-4" />
                    <p className="text-lg md:text-xl text-primary-foreground opacity-90">
                      Visualize your epoxy floors
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent rounded-xl blur-xl -z-10" />
          </motion.div>

          {/* Right side: Text content */}
          <motion.div className="w-full md:w-1/2" initial="hidden" whileInView="visible" viewport={{
          once: true,
          margin: "-100px"
        }} variants={staggerChildren}>
            <motion.div variants={fadeIn}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                What is a <span className="text-primary">PreModel</span>?
              </h2>
            </motion.div>

            <motion.p variants={fadeIn} className="text-xl text-muted-foreground mb-6">PreModel is a groundbreaking visualization tool that instantly renders photorealistic images of your customer's space with your epoxy flooring solutions applied.</motion.p>

            <motion.ul variants={staggerChildren} className="space-y-4 mb-8">
              <motion.li variants={fadeIn} className="flex items-start">
                <div className={cn("mr-3 flex h-8 w-8 items-center justify-center rounded-full", "bg-primary/20 text-primary")}>
                  <Check className="h-5 w-5" />
                </div>
                <p className="text-lg">End indecision with photorealistic previews of finished projects</p>
              </motion.li>
              
              <motion.li variants={fadeIn} className="flex items-start">
                <div className={cn("mr-3 flex h-8 w-8 items-center justify-center rounded-full", "bg-primary/20 text-primary")}>
                  <Check className="h-5 w-5" />
                </div>
                <p className="text-lg">No more holding sample chips against concrete floors</p>
              </motion.li>
              
              <motion.li variants={fadeIn} className="flex items-start">
                <div className={cn("mr-3 flex h-8 w-8 items-center justify-center rounded-full", "bg-primary/20 text-primary")}>
                  <Check className="h-5 w-5" />
                </div>
                <p className="text-lg">Settle design debates instantly with visual proof</p>
              </motion.li>
              
              <motion.li variants={fadeIn} className="flex items-start">
                <div className={cn("mr-3 flex h-8 w-8 items-center justify-center rounded-full", "bg-primary/20 text-primary")}>
                  <Check className="h-5 w-5" />
                </div>
                <p className="text-lg">Transform your sales process into a powerful closing tool</p>
              </motion.li>
            </motion.ul>

            <motion.div variants={fadeIn}>
              <Button onClick={() => window.location.href = "#how-it-works"} className="bg-primary text-primary-foreground text-lg px-8 py-6 rounded-md">
                See How It Works
                <Eye className="ml-3 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>;
};