import React from 'react';
import Input from '../UI/Input';
import Button from '../UI/Button';
import './Step2Videos.css';

const Step2Videos = ({ formData, updateFormData, errors }) => {
    const videos = formData.videos || [{ videoId: '', delay: '' }];

    const updateVideo = (index, field, value) => {
        const newVideos = [...videos];
        newVideos[index] = { ...newVideos[index], [field]: value };
        updateFormData({ videos: newVideos });
    };

    const addVideo = () => {
        const newVideos = [...videos, { videoId: '', delay: '' }];
        updateFormData({ videos: newVideos });
    };

    const removeVideo = (index) => {
        if (videos.length > 1) {
            const newVideos = videos.filter((_, i) => i !== index);
            updateFormData({ videos: newVideos });
        }
    };

    return (
        <div className="videos-container">
            {videos.map((video, index) => (
                <div key={index} className="video-group">
                    
                    {/* O CSS .video-header foi ajustado para melhor layout mobile */}
                    <div className="video-header">
                        <h3 className="video-title">
                            Vídeo {index + 1} 
                            {index === 0 && <span className="required-badge">Obrigatório</span>}
                        </h3>
                        
                        {/* BOTÃO REMOVER: Usando o estilo 'ghost' e 'sm' para ser sutil */}
                        {index > 0 && (
                            <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeVideo(index)}
                                // Aumenta a legibilidade da lixeira
                                style={{ color: 'var(--color-error)' }} 
                            >
                                🗑️ Remover
                            </Button>
                        )}
                    </div>

                    <Input
                        label="ID do Vídeo (vTurb)"
                        type="text"
                        value={video.videoId || ''}
                        onChange={(e) => updateVideo(index, 'videoId', e.target.value)}
                        placeholder="Ex: abc123xyz"
                        required={index === 0}
                        error={index === 0 ? errors.videoId : null}
                        help="ID do vídeo no vTurb/Vimeo."
                    />

                    <Input
                        label="Delay para Mostrar CTA"
                        type="text"
                        value={video.delay || ''}
                        onChange={(e) => updateVideo(index, 'delay', e.target.value)}
                        placeholder="Ex: 27:30 ou 1650"
                        help="Formato: MM:SS ou segundos."
                    />
                </div>
            ))}

            {/* BOTÃO ADICIONAR: Estilo secundário 100% de largura */}
            <Button 
                variant="secondary" 
                onClick={addVideo}
                style={{ width: '100%', marginTop: '16px' }}
            >
                ➕ Adicionar Mais um Vídeo
            </Button>
        </div>
    );
};

export default Step2Videos;