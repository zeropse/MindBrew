import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";

const QuoteSharer = ({ quote, author }) => {
  const [isSharing, setIsSharing] = useState(false);
  const canvasRef = useRef(null);

  // Fast drawing of quote card directly to canvas
  const drawQuoteToCanvas = (quote, author) => {
    if (!canvasRef.current) return null;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Canvas dimensions
    canvas.width = 600;
    canvas.height = 400;

    // Background
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Card background
    ctx.fillStyle = "#262626";
    ctx.fillRect(30, 30, canvas.width - 60, canvas.height - 60);

    // Quote text
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 24px Arial";
    ctx.textAlign = "center";

    // Word wrapping for the quote
    const maxWidth = canvas.width - 100;
    const words = quote.split(" ");
    let line = "";
    let lines = [];

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && i > 0) {
        lines.push(line);
        line = words[i] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line);

    // Draw quote
    let y = canvas.height / 2 - (lines.length - 1) * 15;
    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(`"${lines[i]}"`, canvas.width / 2, y);
      y += 30;
    }

    // Author
    ctx.fillStyle = "#a0a0a0";
    ctx.font = "18px Arial";
    ctx.fillText(`— ${author}`, canvas.width / 2, y + 20);

    // Footer
    ctx.fillStyle = "#4b5563";
    ctx.fillRect(30, canvas.height - 70, canvas.width - 60, 40);

    ctx.fillStyle = "#a0a0a0";
    ctx.font = "14px Arial";
    ctx.textAlign = "left";
    ctx.fillText("MindBrew ~ motivate your life", 50, canvas.height - 45);

    ctx.textAlign = "right";
    ctx.fillText(window.location.origin, canvas.width - 50, canvas.height - 45);

    return canvas;
  };

  const handleShare = async () => {
    if (!quote) return;

    setIsSharing(true);

    try {
      // Generate the share text (as fallback)
      const shareText = `"${quote}" — ${author}\n\nFind more at: ${window.location.origin}`;

      // First try to create and share the image (fast canvas approach)
      if (canvasRef.current) {
        // Draw the quote to canvas (fast operation)
        drawQuoteToCanvas(quote, author);

        try {
          // Convert canvas to blob with a timeout to ensure it doesn't take too long
          const blobPromise = new Promise((resolve, reject) => {
            const timeoutId = setTimeout(
              () => reject(new Error("Canvas to blob timeout")),
              1000
            );

            canvasRef.current.toBlob((blob) => {
              clearTimeout(timeoutId);
              if (blob) resolve(blob);
              else reject(new Error("Failed to create blob"));
            }, "image/png");
          });

          const blob = await blobPromise;
          const file = new File([blob], "mindbrew-quote.png", {
            type: "image/png",
          });

          // Try Web Share API with the file
          if (
            navigator.share &&
            navigator.canShare &&
            navigator.canShare({ files: [file] })
          ) {
            await navigator.share({
              title: "MindBrew Quote",
              text: `"${quote}" — ${author}`,
              files: [file],
              url: window.location.href,
            });
            setIsSharing(false);
            return;
          }

          // If sharing with file not supported, create download link
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "mindbrew-quote.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          // Also copy text to clipboard
          await navigator.clipboard.writeText(shareText);
          alert("Quote image saved and text copied to clipboard!");
          setIsSharing(false);
          return;
        } catch (err) {
          console.log("Canvas sharing failed, falling back to text:", err);
          // Fall through to text sharing
        }
      }

      // Fallback to text sharing if image sharing fails or times out
      if (navigator.share) {
        await navigator.share({
          title: "MindBrew Quote",
          text: shareText,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert("Quote copied to clipboard!");
      }
    } catch (error) {
      console.error("Share failed:", error);

      // Final fallback - just copy to clipboard
      try {
        const shareText = `"${quote}" — ${author}\n\nFind more at: ${window.location.origin}`;
        await navigator.clipboard.writeText(shareText);
        alert("Quote copied to clipboard!");
      } catch (clipboardError) {
        console.error("Clipboard copy failed:", clipboardError);
        alert("Unable to share. Please try again.");
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <>
      {/* Hidden canvas for fast image generation */}
      <canvas
        ref={canvasRef}
        style={{ display: "none", position: "absolute", pointerEvents: "none" }}
      />

      <Button
        className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto cursor-pointer flex items-center justify-center"
        onClick={handleShare}
        disabled={isSharing}
      >
        <Share size={18} className="mr-2" />
        {isSharing ? "Sharing..." : "Share"}
      </Button>
    </>
  );
};

export default QuoteSharer;
