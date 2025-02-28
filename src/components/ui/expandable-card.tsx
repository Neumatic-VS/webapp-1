"use client";

import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  ExternalLink,
  MessageSquare,
  StepForwardIcon as Progress,
  Users,
  Building,
  Mail,
  UserCheck,
  Percent,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress as ProgressBar } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useExpandable } from "@/components/hooks/use-expandable";

interface ProjectStatusCardProps {
  title: string;
  progress: number;
  dueDate: string;
  venue?: {
    name: string;
    address: string;
  };
  invitationsSent: number;
  confirmations: number;
  capacity: number;
  openIssues: number;
}

export function ProjectStatusCard({
  title,
  progress,
  dueDate,
  venue = {
    name: "Centro de Convenções",
    address: "Av. Paulista, 1000, São Paulo, SP",
  },
  invitationsSent,
  confirmations,
  capacity,
  openIssues,
}: ProjectStatusCardProps) {
  const { isExpanded, toggleExpand, animatedHeight } = useExpandable();
  const contentRef = useRef<HTMLDivElement>(null);
  const confirmationRate = Math.round((confirmations / invitationsSent) * 100) || 0;
  const occupancyRate = Math.round((confirmations / capacity) * 100);
  const isOverCapacity = confirmations > capacity;

  useEffect(() => {
    if (contentRef.current) {
      animatedHeight.set(isExpanded ? contentRef.current.scrollHeight : 0);
    }
  }, [isExpanded, animatedHeight]);

  return (
    <Card
      className="w-full max-w-md cursor-pointer transition-all duration-300 hover:shadow-lg"
      onClick={toggleExpand}
    >
      <CardHeader className="space-y-1">
        <div className="flex justify-between items-start w-full">
          <div className="space-y-2">
            <Badge
              variant="secondary"
              className={
                progress === 100
                  ? "bg-green-100 text-green-600"
                  : "bg-blue-100 text-blue-600"
              }
            >
              {dueDate}
            </Badge>
            <h3 className="text-2xl font-semibold">{title}</h3>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="icon" variant="outline" className="h-8 w-8" onClick={(e) => {
                  e.stopPropagation();
                  window.open('https://www.lide.com.br', '_blank');
                }}>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Visite LIDE.com.br</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Capacidade</span>
              <span>{confirmations}/{capacity}</span>
            </div>
            <ProgressBar 
              value={Math.min(occupancyRate, 100)} 
              className={`h-2 ${isOverCapacity ? 'bg-red-200' : ''}`}
              indicatorClassName={isOverCapacity ? 'bg-red-500' : undefined}
            />
          </div>
          
          <div className="flex items-center text-sm">
            <span className={`font-medium ${isOverCapacity ? 'text-red-500' : 'text-gray-600'}`}>
              {occupancyRate}% de ocupação
            </span>
          </div>

          <motion.div
            style={{ height: animatedHeight }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <div ref={contentRef}>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 pt-2"
                  >
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm flex items-center">
                        <Building className="h-4 w-4 mr-2" />
                        Local do Evento
                      </h4>
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">{venue.name}</p>
                        <p>{venue.address}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Estatísticas do Evento</h4>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center">
                            <Mail className="h-4 w-4 mr-2 text-blue-500" />
                            Convites Enviados
                          </span>
                          <span className="font-medium">{invitationsSent}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center">
                            <UserCheck className="h-4 w-4 mr-2 text-green-500" />
                            Confirmações
                          </span>
                          <span className="font-medium">{confirmations}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center">
                            <Percent className="h-4 w-4 mr-2 text-purple-500" />
                            Taxa de Confirmação
                          </span>
                          <span className="font-medium">{confirmationRate}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button className="w-full">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Visualizar Detalhes
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </CardContent>

      <CardFooter>
        <div className="flex items-center justify-between w-full text-sm text-gray-600">
          <span>Última atualização: 2 horas atrás</span>
        </div>
      </CardFooter>
    </Card>
  );
}
