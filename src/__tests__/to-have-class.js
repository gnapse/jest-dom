import {render} from './helpers/test-utils'

test('.toHaveClass', () => {
  const {queryByTestId} = render(`
    <div>
      <button data-testid="delete-button" class="btn extra btn-danger">
        Delete item
      </button>
      <button data-testid="cancel-button">
        Cancel
      </button>
      <svg data-testid="svg-spinner" class="spinner clockwise">
        <path />
      </svg>
    </div>
  `)

  expect(queryByTestId('delete-button')).toHaveClass()
  expect(queryByTestId('delete-button')).toHaveClass('btn')
  expect(queryByTestId('delete-button')).toHaveClass('btn-danger')
  expect(queryByTestId('delete-button')).toHaveClass('extra')
  expect(queryByTestId('delete-button')).not.toHaveClass('xtra')
  expect(queryByTestId('delete-button')).not.toHaveClass('btn xtra')
  expect(queryByTestId('delete-button')).not.toHaveClass('btn', 'xtra')
  expect(queryByTestId('delete-button')).not.toHaveClass('btn', 'extra xtra')
  expect(queryByTestId('delete-button')).toHaveClass('btn btn-danger')
  expect(queryByTestId('delete-button')).toHaveClass('btn', 'btn-danger')
  expect(queryByTestId('delete-button')).toHaveClass(
    'btn extra',
    'btn-danger extra',
  )
  expect(queryByTestId('delete-button')).not.toHaveClass('btn-link')
  expect(queryByTestId('cancel-button')).not.toHaveClass('btn-danger')
  expect(queryByTestId('svg-spinner')).toHaveClass('spinner')
  expect(queryByTestId('svg-spinner')).toHaveClass('clockwise')
  expect(queryByTestId('svg-spinner')).not.toHaveClass('wise')

  expect(() =>
    expect(queryByTestId('delete-button')).not.toHaveClass(),
  ).toThrowError()
  expect(() =>
    expect(queryByTestId('delete-button')).not.toHaveClass('btn'),
  ).toThrowError()
  expect(() =>
    expect(queryByTestId('delete-button')).not.toHaveClass('btn-danger'),
  ).toThrowError()
  expect(() =>
    expect(queryByTestId('delete-button')).not.toHaveClass('extra'),
  ).toThrowError()
  expect(() =>
    expect(queryByTestId('delete-button')).toHaveClass('xtra'),
  ).toThrowError()
  expect(() =>
    expect(queryByTestId('delete-button')).toHaveClass('xtra'),
  ).toThrowError()
  expect(() =>
    expect(queryByTestId('delete-button')).toHaveClass('btn', 'extra xtra'),
  ).toThrowError()
  expect(() =>
    expect(queryByTestId('delete-button')).not.toHaveClass('btn btn-danger'),
  ).toThrowError()
  expect(() =>
    expect(queryByTestId('delete-button')).not.toHaveClass('btn', 'btn-danger'),
  ).toThrowError()
  expect(() =>
    expect(queryByTestId('delete-button')).toHaveClass('btn-link'),
  ).toThrowError()
  expect(() =>
    expect(queryByTestId('cancel-button')).toHaveClass('btn-danger'),
  ).toThrowError()
  expect(() =>
    expect(queryByTestId('svg-spinner')).not.toHaveClass('spinner'),
  ).toThrowError()
  expect(() =>
    expect(queryByTestId('svg-spinner')).toHaveClass('wise'),
  ).toThrowError()
})
