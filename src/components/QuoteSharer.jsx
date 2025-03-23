import { useRef, useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import DOMPurify from "dompurify";

const useQuoteCanvas = () => {
  const canvasRef = useRef(null);

  const drawQuoteToCanvas = useCallback((quote, author) => {
    if (!canvasRef.current) return null;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const scaleFactor = window.devicePixelRatio || 4;
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

    ctx.clearRect(0, 0, scaledWidth, scaledHeight);

    drawBackground(ctx, scaledWidth, scaledHeight, padding);

    const lines = prepareTextLines(ctx, quote, contentWidth);

    const { startY } = calculatePositions(lines.length, scaledHeight, padding);

    drawQuoteText(ctx, lines, startY, centerX);

    drawAuthor(ctx, author, startY + lines.length * 30, centerX);

    drawFooter(ctx, scaledWidth, scaledHeight, padding);

    return canvas;
  }, []);

  const drawBackground = (ctx, width, height, padding) => {
    ctx.fillStyle = "#262626";
    ctx.fillRect(0, 0, width, height);
    ctx.fillRect(padding / 2, padding / 2, width - padding, height - padding);
  };

  const prepareTextLines = (ctx, text, maxWidth) => {
    ctx.font =
      "bold 24px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
    ctx.textAlign = "center";

    const words = text.split(" ");
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

    return lines;
  };

  const calculatePositions = (lineCount, height, padding) => {
    const lineHeight = 30;
    const quoteHeight = lineCount * lineHeight;
    const authorHeight = 40;
    const footerHeight = 40;

    const topPadding = padding / 2;
    const bottomPadding = padding / 2;
    const footerSpace = footerHeight + bottomPadding;
    const totalContentHeight = quoteHeight + authorHeight;

    const availableHeight = height - footerSpace - topPadding;
    const startY = topPadding + (availableHeight - totalContentHeight) / 2;

    return { startY, footerY: height - footerHeight - bottomPadding };
  };

  const drawQuoteText = (ctx, lines, startY, centerX) => {
    ctx.textRendering = "optimizeLegibility";
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const lineHeight = 30;
    let y = startY;

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

    return y;
  };

  const drawAuthor = (ctx, author, y, centerX) => {
    ctx.fillStyle = "#a0a0a0";
    ctx.font =
      "italic 18px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
    ctx.fillText(`— ${author}`, centerX, y + 20);
  };

  const drawFooter = (ctx, width, height, padding) => {
    const footerHeight = 40;
    const footerY = height - footerHeight - padding / 2;

    ctx.fillStyle = "#262626";
    ctx.fillRect(padding / 2, footerY, width - padding, footerHeight);

    ctx.fillStyle = "#a0a0a0";
    ctx.font =
      "14px system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

    const footerTextY = footerY + footerHeight / 2 + 5;
    const brandName = "MindBrew";
    const websiteUrl = "mindbrew.zeropse.xyz";

    ctx.textAlign = "left";
    ctx.fillText(brandName, padding, footerTextY);

    ctx.textAlign = "right";
    ctx.fillText(websiteUrl, width - padding, footerTextY);
  };

  return { canvasRef, drawQuoteToCanvas };
};

// Debounce function to prevent rapid consecutive clicks
const useDebounce = (callback, delay = 300) => {
  const timer = useRef(null);

  return (...args) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      callback(...args);
      timer.current = null;
    }, delay);
  };
};

const QuoteSharer = ({ quote, author }) => {
  const [isSharing, setIsSharing] = useState(false);
  const { canvasRef, drawQuoteToCanvas } = useQuoteCanvas();

  // Sanitize inputs to prevent XSS
  const sanitizedQuote = useMemo(
    () => DOMPurify.sanitize(quote || ""),
    [quote]
  );

  const sanitizedAuthor = useMemo(
    () => DOMPurify.sanitize(author || ""),
    [author]
  );

  const handleShare = useDebounce(async () => {
    if (!sanitizedQuote || isSharing) return;

    setIsSharing(true);

    try {
      // Always draw the canvas first
      if (canvasRef.current) {
        drawQuoteToCanvas(sanitizedQuote, sanitizedAuthor);

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

          // Try Web Share API with the image file first
          if (
            navigator.share &&
            navigator.canShare &&
            navigator.canShare({ files: [file] })
          ) {
            await navigator.share({
              files: [file],
            });
            toast.success("Quote shared as image!");
            setIsSharing(false);
            return;
          }

          // If sharing with the Web Share API isn't possible, copy the image to clipboard
          if (navigator.clipboard && navigator.clipboard.write) {
            const clipboardItem = new ClipboardItem({
              "image/png": blob,
            });

            await navigator.clipboard.write([clipboardItem]);
            toast.success("Quote image copied to clipboard!");
            setIsSharing(false);
            return;
          }

          // If neither method works, show an error
          toast.error(
            "Could not share or copy image. Your browser may not support this feature."
          );
        } catch (err) {
          console.error("Canvas sharing failed:", err);
          // More specific error messages based on error type
          if (err.name === "NotAllowedError") {
            toast.error("Clipboard permission denied. Please try again.");
          } else if (err.message.includes("timeout")) {
            toast.error("Image generation timed out.");
          } else {
            toast.error("Could not share as image. Try again later.");
          }
        }
      }
    } catch (error) {
      console.error("Share failed:", error);

      // Provide more specific error messages
      if (error.name === "AbortError") {
        toast.error("Sharing was cancelled.");
      } else if (error.name === "NotAllowedError") {
        toast.error("Permission to share was denied.");
      } else if (navigator.onLine === false) {
        toast.error("You appear to be offline. Please check your connection.");
      } else {
        toast.error("Unable to share. Please try again.");
      }
    } finally {
      setIsSharing(false);
    }
  });

  return (
    <div className="quote-sharer">
      <Toaster position="top-center" />

      <canvas
        ref={canvasRef}
        style={{
          display: "none",
          position: "absolute",
          pointerEvents: "none",
        }}
        className="offscreen-canvas"
        aria-hidden="true"
      />

      <div className="flex justify-center w-full">
        <Button
          className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white cursor-pointer"
          onClick={handleShare}
          disabled={isSharing}
          aria-label={isSharing ? "Sharing quote" : "Share quote"}
        >
          <Share size={18} className="mr-2" />
          {isSharing ? "Sharing..." : "Share Quote"}
        </Button>
      </div>
    </div>
  );
};

export default QuoteSharer;
