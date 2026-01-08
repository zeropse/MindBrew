import { toBlob } from "html-to-image";

export const shareAsImage = async (
  element,
  fileName = "mindbrew-quote.png"
) => {
  if (!element) {
    throw new Error("No element provided for capture");
  }

  try {
    // Standard capture settings for better quality
    const blob = await toBlob(element, {
      cacheBust: true,
      backgroundColor: "var(--card)", // Match theme card background
      pixelRatio: 2, // Higher resolution
      style: {
        transform: "scale(1)",
        margin: "0",
      },
    });

    if (!blob) {
      throw new Error("Failed to generate image blob");
    }

    const file = new File([blob], fileName, { type: "image/png" });

    // 1. Try Web Share API (Mobile/Modern browsers)
    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({ files: [file] })
    ) {
      await navigator.share({
        files: [file],
      });
      return { success: true, method: "share" };
    }

    // 2. Try Clipboard API (Desktop/Modern browsers)
    if (navigator.clipboard && navigator.clipboard.write) {
      try {
        await navigator.clipboard.write([
          new ClipboardItem({
            [blob.type]: blob,
          }),
        ]);
        return { success: true, method: "clipboard" };
      } catch (clipError) {
        console.warn(
          "Clipboard write failed, falling back to download",
          clipError
        );
      }
    }

    // 3. Last Fallback: Download the image
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up
    setTimeout(() => URL.revokeObjectURL(url), 100);

    return { success: true, method: "download" };
  } catch (error) {
    console.error("Sharing failed:", error);
    throw error;
  }
};
