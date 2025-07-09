import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { APIBooksId } from '../Routes/server/api'

export default function BookInfo () {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(false)
  const [erroMessage, setErroMessage] = useState(null)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true)
        const result = await APIBooksId(id)
        setBook(result)
        console.log('carregando volume...?') // teste
      } catch (erro) {
        console.error('Erro ao buscar livro:', erro)
        setErroMessage(erro.message)
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [id])

  if (loading) return <p>Carregando...</p>

  if (erroMessage) {
    return (
      <div className='text-red-600 border-red-600 p-2.5 rounded-[5px]'>
        <h2>Erro ao buscar livros:</h2>
        <p>{erroMessage}</p>
      </div>
    )
  }

  if (!book) return null

  const { title, authors, description, imageLinks } = book.volumeInfo

  const cleanDescription = raw =>
    raw ? raw.replace(/<[^>]*>/g, '') : 'Sem descrição disponível.'

  const correctDescription = cleanDescription(description)

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold mb-2'>{title}</h1>
      {authors ? <p>
        <strong>Autores:</strong> {authors?.join(', ')}
      </p> : 'Nenhum autor declarado.'}
      
      <img
        src={imageLinks?.thumbnail}
        alt={`imagem do livro ${title}`}
        className='my-2'
      />
      <p className='mt-4'>{correctDescription}</p>
    </div>
  )
}
