import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CallScreenProps {
  contactName: string;
  callType: "audio" | "video";
  onEnd: () => void;
}

const CallScreen = ({ contactName, callType, onEnd }: CallScreenProps) => {
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(callType === "video");
  const [callState, setCallState] = useState<"ringing" | "connected" | "ended">("ringing");

  useEffect(() => {
    // Simulate call connecting after 2 seconds
    const connectTimer = setTimeout(() => {
      setCallState("connected");
    }, 2000);

    return () => clearTimeout(connectTimer);
  }, []);

  useEffect(() => {
    if (callState !== "connected") return;
    const interval = setInterval(() => {
      setCallDuration((d) => d + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [callState]);

  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleEnd = () => {
    setCallState("ended");
    setTimeout(onEnd, 500);
  };

  const initial = contactName.charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between py-12 px-6 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[150px]" />
      </div>

      {/* Top section - Contact info */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative z-10"
      >
        <motion.div
          className="relative mx-auto mb-6"
          animate={callState === "ringing" ? { scale: [1, 1.05, 1] } : {}}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="w-28 h-28 rounded-full gradient-primary flex items-center justify-center mx-auto relative">
            {callState === "ringing" && (
              <>
                <div className="absolute inset-0 rounded-full border-2 border-primary animate-ring-pulse" />
                <div className="absolute inset-0 rounded-full border-2 border-primary animate-ring-pulse [animation-delay:0.5s]" />
              </>
            )}
            <span className="text-4xl font-bold text-primary-foreground">{initial}</span>
          </div>
        </motion.div>

        <h2 className="text-2xl font-bold font-display text-foreground mb-2">{contactName}</h2>
        <p className="text-muted-foreground">
          {callState === "ringing" && "Calling..."}
          {callState === "connected" && formatDuration(callDuration)}
          {callState === "ended" && "Call ended"}
        </p>

        {callState === "ringing" && (
          <div className="flex items-center justify-center gap-1 mt-3">
            <Volume2 className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm text-primary">Ringing</span>
          </div>
        )}
      </motion.div>

      {/* Middle spacer */}
      <div />

      {/* Bottom controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10"
      >
        <div className="glass-strong rounded-3xl p-6 flex items-center gap-4">
          <Button
            variant={isMuted ? "destructive" : "secondary"}
            size="icon"
            className="w-14 h-14 rounded-full"
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>

          <Button
            variant="call-end"
            size="icon"
            className="w-16 h-16"
            onClick={handleEnd}
          >
            <PhoneOff className="w-7 h-7" />
          </Button>

          {callType === "video" && (
            <Button
              variant={!isVideoOn ? "destructive" : "secondary"}
              size="icon"
              className="w-14 h-14 rounded-full"
              onClick={() => setIsVideoOn(!isVideoOn)}
            >
              {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default CallScreen;
