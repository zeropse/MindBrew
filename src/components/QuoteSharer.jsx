import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

const QuoteSharer = ({ quote, author }) => {
  const [isSharing, setIsSharing] = useState(false);
  const canvasRef = useRef(null);

  const drawQuoteToCanvas = (quote, author) => {
    if (!canvasRef.current) return null;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const scaleFactor = 8;
    const width = 600 * scaleFactor;
    const height = 400 * scaleFactor;
    const scaledWidth = width / scaleFactor;
    const scaledHeight = height / scaleFactor;
    const padding = 60;
    const contentWidth = scaledWidth - padding * 2;
    const centerX = scaledWidth / 2;

    canvas.width = width;
    canvas.height = height;
    ctx.scale(scaleFactor, scaleFactor);

    ctx.fillStyle = "#262626";
    ctx.fillRect(0, 0, scaledWidth, scaledHeight);
    ctx.fillRect(
      padding / 2,
      padding / 2,
      scaledWidth - padding,
      scaledHeight - padding
    );

    ctx.font =
      "bold 24px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
    ctx.textAlign = "center";

    const maxWidth = contentWidth;
    const words = quote.split(" ");
    let lines = [];
    let currentLine = "";

    for (const word of words) {
      const testLine = currentLine + (currentLine ? " " : "") + word;
      const { width: testWidth } = ctx.measureText(testLine);

      if (testWidth > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }

    const lineHeight = 30;
    const quoteHeight = lines.length * lineHeight;
    const authorHeight = 40;
    const footerHeight = 40;

    const topPadding = padding / 2;
    const bottomPadding = padding / 2;
    const footerSpace = footerHeight + bottomPadding;
    const totalContentHeight = quoteHeight + authorHeight;

    const availableHeight = scaledHeight - footerSpace - topPadding;
    const startY = topPadding + (availableHeight - totalContentHeight) / 2;

    let y = startY;

    ctx.textRendering = "optimizeLegibility";
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    for (let i = 0; i < lines.length; i++) {
      let text = lines[i];
      if (i === 0) text = `"${text}`;
      if (i === lines.length - 1) text = `${text}"`;

      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillText(text, centerX + 1, y + 1);

      ctx.fillStyle = "#ffffff";
      ctx.fillText(text, centerX, y);
      y += lineHeight;
    }

    ctx.fillStyle = "#a0a0a0";
    ctx.font =
      "italic 18px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
    ctx.fillText(`— ${author}`, centerX, y + 20);

    const footerY = scaledHeight - footerHeight - bottomPadding;
    ctx.fillStyle = "#262626";
    ctx.fillRect(padding / 2, footerY, scaledWidth - padding, footerHeight);

    ctx.fillStyle = "#a0a0a0";
    ctx.font =
      "14px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

    const footerTextY = footerY + footerHeight / 2 + 5;

    // Calculate appropriate spacing for footer text
    const leftPadding = padding; // Left margin
    const rightPadding = padding; // Right margin
    const brandName = "MindBrew";
    const websiteUrl = "mindbrew.zeropse.xyz";

    // Measure text widths to ensure they fit correctly
    ctx.textAlign = "left";

    ctx.textAlign = "right";

    // Draw the footer text with appropriate padding
    ctx.textAlign = "left";
    ctx.fillText(brandName, leftPadding, footerTextY);

    ctx.textAlign = "right";
    // Remove the third parameter (maxWidth) to allow the text to render at its natural width
    ctx.fillText(websiteUrl, scaledWidth - rightPadding, footerTextY);

    return canvas;
  };

  const handleShare = async () => {
    if (!quote || isSharing) return;

    setIsSharing(true);

    try {
      const shareText = `"${quote}"\n\n — ${author}\n\nFind more at: mindbrew.zeropse.xyz`;

      if (canvasRef.current) {
        drawQuoteToCanvas(quote, author);

        try {
          const blobPromise = new Promise((resolve, reject) => {
            const timeoutId = setTimeout(
              () => reject(new Error("Canvas to blob timeout")),
              5000
            );

            canvasRef.current.toBlob(
              (blob) => {
                clearTimeout(timeoutId);
                if (blob) resolve(blob);
                else reject(new Error("Failed to create blob"));
              },
              "image/png",
              1.0
            );
          });

          const blob = await blobPromise;
          const file = new File([blob], "mindbrew-quote.png", {
            type: "image/png",
          });

          if (
            navigator.share &&
            navigator.canShare &&
            navigator.canShare({ files: [file] })
          ) {
            await navigator.share({
              files: [file],
            });
            toast.success("Quote shared successfully!");
            return;
          }
        } catch (err) {
          console.log("Canvas sharing failed, falling back to text:", err);
        }
      }

      if (navigator.share) {
        await navigator.share({
          title: "MindBrew Quote",
          text: shareText,
          url: "mindbrew.zeropse.xyz",
        });
        toast.success("Quote shared successfully!");
      } else {
        await navigator.clipboard.writeText(shareText);
        toast.success("Quote copied to clipboard!");
      }
    } catch (error) {
      console.error("Share failed:", error);
      toast.error("Unable to share. Please try again.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <canvas
        ref={canvasRef}
        style={{ display: "none", position: "absolute", pointerEvents: "none" }}
        className="offscreen-canvas"
        aria-hidden="true"
      />

      <Button
        className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white w-full sm:w-auto flex items-center justify-center transition-colors cursor-pointer"
        onClick={handleShare}
        disabled={isSharing}
        aria-label="Share quote"
      >
        <Share size={18} className="mr-2" />
        {isSharing ? "Sharing..." : "Share"}
      </Button>
    </>
  );
};

export default QuoteSharer;
