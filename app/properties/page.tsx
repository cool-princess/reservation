import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";

import getCurrentUser from "../actions/getCurrentUser";
import PropertiesClient from "./PropertiesClient";
import getListings from "../actions/getListings";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login"></EmptyState>
      </ClientOnly>
    );
  }
 
  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length == 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="Not Properties found"
          subtitle="Look like you no properties."
        ></EmptyState>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default PropertiesPage;
