import ErrorHandler from '../../components/common/ErrorHandler'
import Loader from '../../components/common/Loader'
import { ReactNode } from "react";

const ShowLoadingErrorMessages = ({
  hasData,
  error,
  children,
}: {
  hasData: boolean
  error: Error | null | undefined
  children: ReactNode
}) => {
  // isLoading state
  if (!hasData && !error) return <Loader />

  // Error states
  if (error) return <ErrorHandler error={error} />

  // Edge case error state ...
  if (!hasData) return <Loader />

  // Data has successfully loaded! Render the child component which renders the data.
  return <>{children}</>
}

export default ShowLoadingErrorMessages
