interface UploadResponse {
  mensagem: string;
  nomeDoArquivo: string;
}

const gerarNomeUnico = (file: File): string => {
    const timestamp = Date.now();
    return `${timestamp}-${file.name}`;
}

export const uploadFile = async (file: File): Promise<string | null> => {
  const nomeUnico = gerarNomeUnico(file);
  
  const arquivoRenomeado = new File([file], nomeUnico, { type: file.type });

  const formData = new FormData();
  formData.append('anexo', arquivoRenomeado);

  try {
    const response = await fetch('http://localhost:4000/api/upload', {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) throw new Error('Falha no upload do arquivo.');
    const result: UploadResponse = await response.json();
    
    return result.nomeDoArquivo;
  } catch (error) {
    console.error("Erro no serviço de upload:", error);
    return null;
  }
};

export const deleteFile = async (fileName: string): Promise<boolean> => {
  try {
    const response = await fetch(`http://localhost:4000/api/delete/${fileName}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensagem || 'Falha ao deletar o arquivo no servidor.');
    }
    
    console.log(`Arquivo ${fileName} deletado com sucesso do servidor.`);
    return true; 

  } catch (error) {
    console.error("Erro no serviço de exclusão de arquivo:", error);
    alert(error instanceof Error ? error.message : "Erro desconhecido");
    return false; 
  }
};