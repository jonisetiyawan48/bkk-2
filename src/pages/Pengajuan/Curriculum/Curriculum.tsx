import { Progress } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { UID } from '../../../utils/constants'
import { checkRole } from '../../../utils/helpers/checkRole'
import { fetchTests } from './api/apihandler'
import Tables from './fragments/Tables'

export default function Curriculum() {
  const [test, setTests] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchApi = async () => {
    await fetchTests()
      .then((data) => {
        const filtered = data.value?.filter((item:any) => item.createdBy === UID)
        setTests(checkRole(['1']) ? filtered : data.value);
      })
      .then(() => setLoading(false))
  }

  useEffect(() => {
    fetchApi()
  }, [])

  if(loading) {
    return <Progress colorScheme="red" isIndeterminate size="xs" />
  } else {
    return <Tables curriculums={test} reload={fetchApi}/>
  }
}
