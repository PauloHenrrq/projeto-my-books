import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { APIBooksId } from '../../Routes/server/api'
import FavoriteButton from '../FavoriteButton'
import { ArrowLongLeftIcon } from '@heroicons/react/24/solid'

export default function BookInfo () {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(false)
  const [erroMessage, setErroMessage] = useState(null)

  useEffect(() => {
    console.log(book?.accessInfo)
  }, [book])

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true)
        const result = await APIBooksId(id)
        setBook(result)
        console.log('carregando volume...?', result) // teste
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

  const { title, authors, description, previewLink, imageLinks } =
    book.volumeInfo

  const cleanDescription = raw =>
    raw ? raw.replace(/<[^>]*>/g, '') : 'Sem descrição disponível.'

  const correctDescription = cleanDescription(description)

  return (
    <div className='p-3 rounded-xl flex-1'>
      <Link
        to='/'
        className='group flex gap-3 p-3 rounded-2xl bg-white w-fit items-center'
      >
        <ArrowLongLeftIcon className='w-7 transform transition-transform duration-300 group-hover:-translate-x-2' />
        <p className='rounded-2xl font-bold'>Voltar</p>
      </Link>
      <div className='flex flex-row-reverse flex-wrap justify-center order-1'>
        <div className='relative flex flex-col h-fit gap-5 bg-zinc-50 border-2 border-[var(--cinza-claro)] shadow-lg m-6 p-5 rounded-xl'>
          <img
            src={imageLinks?.thumbnail}
            alt={`imagem do livro ${title}`}
            className='flex m-auto min-w-40 my-2 rounded'
          />
          <div className='flex gap-5'>
            {book?.accessInfo.viewability === 'PARTIAL' ||
            book?.accessInfo.viewability === 'ALL_PAGES' ? (
              <a
                href={`https://books.google.com.br/books?id=${book.id}&printsec=frontcover&hl=pt-BR#v=onepage&q&f=false`}
                target='_blank'
                className='font-bold bg-blue-600 py-2.5 px-3 rounded text-white shadow-[2px_2px_5px_gray] hover:bg-blue-700 transition-all duration-200 cursor-pointer whitespace-nowrap'
              >
                Ver Prévia
              </a>
            ) : (
              <p className='py-2.5 px-3 cursor-default whitespace-nowrap'>
                Sem Prévia
              </p>
            )}
            <FavoriteButton id={book.id} button={true} />
          </div>
        </div>
        <div className='flex flex-col gap-5 bg-zinc-50 border-2 border-[var(--cinza-claro)] shadow-lg m-6 p-5 rounded-xl max-md:m-0'>
          <h1 className='text-3xl font-bold mb-2 max-md:text-center'>
            {title}
          </h1>
          {authors ? (
            <p>
              <strong>Autores:</strong> {authors?.join(', ')}
            </p>
          ) : (
            'Nenhum autor declarado.'
          )}

          <h3 className='text-2xl font-bold mt-6 text-center'>Descrição</h3>
          <p className='max-w-[800px] text-justify line-clamp-[9]'>
            &nbsp;{correctDescription}
          </p>
          <a
            href={previewLink}
            target='_blank'
            className='relative bottom-5 w-fit h-5 text-blue-600 border-b-1 cursor-pointer bg-white'
          >
            Ver mais
          </a>
        </div>
      </div>
    </div>
  )
}
