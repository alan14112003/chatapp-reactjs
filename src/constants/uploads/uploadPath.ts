function createEventName(name: string) {
  return {
    AUTH: name + 'auth',
  }
}

const PathUploadFile = createEventName('/')

export default PathUploadFile
