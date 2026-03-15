import React from 'react';
import { FaShare } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Button from './Button';

const ShareButton = ({ quote }) => {
  const handleShare = async () => {
    const shareText = `"${quote.text}"\n\n- ${quote.source} (${quote.reference})`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Citation Islamique',
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        if (error.name !== 'AbortError') {
          toast.error('Erreur lors du partage');
        }
      }
    } else {
      // Fallback: copier dans le presse-papier
      try {
        await navigator.clipboard.writeText(shareText);
        toast.success('Citation copiée dans le presse-papier!');
      } catch (error) {
        toast.error('Erreur lors de la copie');
      }
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      icon={FaShare}
      onClick={handleShare}
    >
      Partager
    </Button>
  );
};

export default ShareButton;