import { Box, Flex } from '@chakra-ui/react'
import React from 'react'

const Settings = () => {
  {console.log(import.meta.env)}
  return (
    <Flex direction="column" align="center" justify="center">
      <Box w={{ base: "95%", md: "50%", lg: "33%" }}>
        <h1>Settings</h1>
      </Box>
    </Flex>

  )
}

export default Settings