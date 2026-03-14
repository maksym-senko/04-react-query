import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Movie } from '../../types/movie';
import s from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const modalRoot = document.getElementById('modal-root');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.code === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  if (!modalRoot) return null;

  const poster = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : 'https://via.placeholder.com/500x750?text=No+Poster';

  return createPortal(
    <div className={s.backdrop} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={s.content}>
        <button className={s.closeBtn} onClick={onClose}>&times;</button>
        
        <div className={s.columns}>
          <div className={s.posterColumn}>
            <img src={poster} alt={movie.title} className={s.poster} />
          </div>
          
          <div className={s.infoColumn}>
            <h2 className={s.title}>{movie.title}</h2>
            <p className={s.rating}>⭐ {movie.vote_average.toFixed(1)} / 10</p>
            <p className={s.overview}>{movie.overview}</p>
            <p className={s.date}>Release: {movie.release_date}</p>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default MovieModal;