import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import Loader from './Loader'

interface Props {
  error?: Error
}

// TODO: Rename to `ErrorHandler` - typo
export default function ErrorHanlder({
  error = new Error('Unexpected error. Try refreshing the page.'),
}: Props) {
  const router = useRouter()
  switch (error.message) {
    case 'FETCHER: 401':
      router.push('/api/auth/login')
      return <Loader />
    default:
      return <Typography>{'Unexpected error. Try refreshing the page.'}</Typography>
  }
}
