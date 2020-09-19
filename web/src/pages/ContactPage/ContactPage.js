import {
  FieldError,
  Form,
  FormError,
  Label,
  Submit,
  TextAreaField,
  TextField
} from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { useForm } from 'react-hook-form'
import BlogLayout from 'src/layouts/BlogLayout'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm({ mode: 'onBlur' })
  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      alert('Thank you for your Submission!')
      formMethods.reset()
    },
  })

  const onSubmit = async (data) => {
    try {
      await create({
        variables: {
          input: data,
        },
      })
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <BlogLayout>
      <h1>ContactPage</h1>
      <Form
        onSubmit={onSubmit}
        validation={{ mode: 'onBlur' }}
        error={error}
        formMethods={formMethods}
      >
        <FormError
          error={error}
          wrapperStyle={{ color: 'red', backgroundColor: 'lavenderblush' }}
        />
        <div className="input">
          <Label name="name" errorClassName="error">
            Name:
          </Label>
          <TextField
            name="name"
            placeholder="Enter Name"
            validation={{ required: true }}
            errorClassName="error"
          />
          <FieldError name="name" className="error" />
        </div>
        <div className="input">
          <Label name="email" errorClassName="error">
            Email:
          </Label>
          <TextField
            name="email"
            placeholder="Enter Email"
            validation={{
              required: true,
              pattern: {
                value: /[^@]+@[^.]+\..+/,
              },
              message: 'Please enter a valid email address',
            }}
            errorClassName="error"
          />
          <FieldError name="email" className="error" />
        </div>
        <div className="input">
          <Label name="message" errorClassName="error">
            Message:
          </Label>
          <TextAreaField
            name="message"
            placeholder="Enter Message"
            validation={{ required: true }}
            errorClassName="error"
          />
          <FieldError name="message" className="error" />
        </div>

        <Submit disabled={loading}>Sav{loading ? 'ing' : 'e'}</Submit>
      </Form>
    </BlogLayout>
  )
}

export default ContactPage
