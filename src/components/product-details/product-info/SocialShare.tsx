import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

interface SocialShareProps {
  onShare: (platform: string) => void;
}

export const SocialShare = ({ onShare }: SocialShareProps) => {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-500">Share on:</span>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full p-2 hover:bg-blue-50"
          onClick={() => onShare('facebook')}
        >
          <Facebook className="w-4 h-4 text-blue-600" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full p-2 hover:bg-sky-50"
          onClick={() => onShare('twitter')}
        >
          <Twitter className="w-4 h-4 text-sky-500" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full p-2 hover:bg-pink-50"
          onClick={() => onShare('instagram')}
        >
          <Instagram className="w-4 h-4 text-pink-600" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full p-2 hover:bg-blue-50"
          onClick={() => onShare('linkedin')}
        >
          <Linkedin className="w-4 h-4 text-blue-700" />
        </Button>
      </div>
    </div>
  );
};