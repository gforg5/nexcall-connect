import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Video, Search, Plus, LogOut, User, Clock, PhoneCall, PhoneOff, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useContacts } from "@/hooks/useContacts";
import { useNavigate } from "react-router-dom";
import CallScreen from "@/components/CallScreen";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { contacts, loading, addContact, removeContact } = useContacts();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [addUsername, setAddUsername] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [activeCall, setActiveCall] = useState<{
    contactName: string;
    callType: "audio" | "video";
  } | null>(null);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleAddContact = async () => {
    if (addUsername.trim()) {
      await addContact(addUsername.trim());
      setAddUsername("");
      setAddDialogOpen(false);
    }
  };

  const startCall = (contactName: string, callType: "audio" | "video") => {
    setActiveCall({ contactName, callType });
  };

  const filteredContacts = contacts.filter((c) => {
    const name = c.profile?.display_name || c.profile?.username || "";
    return name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const getInitial = (name: string) => name.charAt(0).toUpperCase();
  const getColor = (name: string) => {
    const colors = [
      "bg-primary/20 text-primary",
      "bg-accent/20 text-accent",
      "bg-glow-muted text-foreground",
      "bg-calling/20 text-calling",
      "bg-destructive/20 text-destructive",
    ];
    return colors[name.charCodeAt(0) % colors.length];
  };

  if (activeCall) {
    return (
      <CallScreen
        contactName={activeCall.contactName}
        callType={activeCall.callType}
        onEnd={() => setActiveCall(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass-strong sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Phone className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold font-display gradient-text">NexCall</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-sm">
              <User className="w-4 h-4 text-primary" />
              <span className="text-foreground hidden sm:inline">
                {user?.email?.split("@")[0]}
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleSignOut} title="Sign out">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Search & Add */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border h-12"
            />
          </div>
          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="hero" size="icon" className="w-12 h-12 shrink-0">
                <Plus className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-strong border-border">
              <DialogHeader>
                <DialogTitle className="font-display">Add Contact</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Input
                  placeholder="Enter username..."
                  value={addUsername}
                  onChange={(e) => setAddUsername(e.target.value)}
                  className="bg-secondary border-border h-12"
                  onKeyDown={(e) => e.key === "Enter" && handleAddContact()}
                />
                <Button variant="hero" className="w-full h-12" onClick={handleAddContact}>
                  Add Contact
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="glass rounded-2xl p-5 text-left hover:border-primary/30 transition-all"
          >
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center mb-3">
              <PhoneCall className="w-5 h-5 text-primary-foreground" />
            </div>
            <p className="font-semibold font-display">Quick Call</p>
            <p className="text-sm text-muted-foreground">Dial a number</p>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="glass rounded-2xl p-5 text-left hover:border-primary/30 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <p className="font-semibold font-display">Recent Calls</p>
            <p className="text-sm text-muted-foreground">View history</p>
          </motion.button>
        </div>

        {/* Contacts */}
        <div>
          <h2 className="text-lg font-semibold font-display mb-4 text-foreground/80">
            Contacts {contacts.length > 0 && `(${contacts.length})`}
          </h2>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-20 rounded-xl bg-secondary/50 animate-pulse" />
              ))}
            </div>
          ) : filteredContacts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground mb-2">
                {searchQuery ? "No contacts match your search" : "No contacts yet"}
              </p>
              {!searchQuery && (
                <p className="text-sm text-muted-foreground">
                  Tap the + button to add someone
                </p>
              )}
            </motion.div>
          ) : (
            <div className="space-y-2">
              {filteredContacts.map((contact, i) => {
                const name = contact.profile?.display_name || contact.profile?.username || "User";
                return (
                  <motion.div
                    key={contact.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass rounded-xl p-4 flex items-center gap-4 hover:border-primary/20 transition-all group"
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${getColor(name)}`}
                    >
                      {getInitial(name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        @{contact.profile?.username || "unknown"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="call"
                        size="icon"
                        className="w-10 h-10"
                        onClick={() => startCall(name, "audio")}
                        title="Audio call"
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="call"
                        size="icon"
                        className="w-10 h-10"
                        onClick={() => startCall(name, "video")}
                        title="Video call"
                      >
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="w-10 h-10 text-muted-foreground hover:text-destructive"
                        onClick={() => removeContact(contact.id)}
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
