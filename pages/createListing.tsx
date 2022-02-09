import { Box, Button, TextField, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import { NextLinkComposed } from 'frontend/components/common/Link'
import { useCreateListing } from 'frontend/data'

const Dashboard: NextPage = () => {
  const { createListing } = useCreateListing()
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      await createListing(title, description)
      router.push('/dashboard')
      enqueueSnackbar('New listing successfully posted!', { variant: 'success' })
    } catch (error) {
      enqueueSnackbar('New listing failed to post. Try again.', { variant: 'error' })
    }
  }

  return (
    <>
      <Box m={4} maxWidth={400}>
        <form onSubmit={submitData}>
          <Typography variant="h6">New Listing</Typography>
          <TextField
            margin="normal"
            fullWidth
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            type="text"
            value={title}
          />
          <TextField
            margin="normal"
            fullWidth
            maxRows={4}
            minRows={4}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            rows={8}
            value={description}
          />
          <Box my={2} display="flex">
            <Box mr={2}>
              <Button variant="contained" type="submit" disabled={!description || !title}>
                Create
              </Button>
            </Box>
            <Button variant="outlined" type="submit" component={NextLinkComposed} to="/dashboard">
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </>
  )
}

export default Dashboard
