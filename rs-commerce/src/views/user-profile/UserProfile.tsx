import apiRootWithExistingTokenFlow from 'SDK/apiRootWithExistingTokenFlow';

export default function UserProfile(): JSX.Element {
  function getUser() {
    console.log('get User');
    console.log(apiRootWithExistingTokenFlow());
    console.log('get User');
    console.log(
      apiRootWithExistingTokenFlow()
        .customers()
        .withId({ ID: '935f8468-3fc9-42eb-a16e-b03e943fbbc9' })
        .get()
        .execute(),
    );
  }

  return (
    <button type="button" onClick={getUser}>
      Get User Profile
    </button>
  );
}
