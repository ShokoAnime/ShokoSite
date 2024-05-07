// import { LoaderFunctionArgs, json } from '@remix-run/node';
// import { Profile } from '~/models/profile';
// import { ApiResult } from '~/api/api';
// import { useCallback, useEffect, useState } from 'react';
// import { useFetcher, useLoaderData } from '@remix-run/react';
//
// export async function loader({ request }: LoaderFunctionArgs) {
//   const pageUrl = new URL(request.url);
//   const page = pageUrl.searchParams.get('page');
//   const resp = await fetch(`http://localhost:3000/profiles?_page=${page ?? 1}&_per_page=100`);
//   const profiles = await resp.json();
//   console.log(profiles);
//   return json({ profiles: profiles });
// }
//
// function InfiniteScrolls() {
//   const { profiles: data } = useLoaderData<typeof loader>();
//   const [profiles, setProfiles] = useState<Profile[]>(data.data ?? []);
//   const [scrollPos, setScrollPos] = useState(0);
//   const [clientHeight, setClientHeight] = useState(0);
//
//   const [height, setHeight] = useState(null);
//   const [shouldFetch, setShouldFetch] = useState(true);
//
//   const fetcher = useFetcher<ApiResult<Profile>>();
//   const [page, setPage] = useState(data.next);
//
//   useEffect(() => {
//     const scrollListener = () => {
//       setClientHeight(window.innerHeight);
//       setScrollPos(window.scrollY);
//     };
//
//     if (typeof window !== 'undefined') {
//       window.addEventListener('scroll', scrollListener);
//     }
//
//     return () => {
//       if (typeof window !== 'undefined') {
//         window.removeEventListener('scroll', scrollListener);
//       }
//     };
//   });
//
//   useEffect(() => {
//     if (!shouldFetch || !height) return;
//     if (clientHeight + scrollPos + 100 < height) return;
//     if (fetcher.state === 'loading') return;
//
//     fetcher.load(`/infinite-scrolls?page=${page}`);
//     setShouldFetch(false);
//   }, [clientHeight, scrollPos, fetcher.state]);
//
//   useEffect(() => {
//     if (!fetcher.data) return;
//     const { profiles: newData } = fetcher.data;
//     setProfiles((prev) => [...prev, ...newData.data]);
//     if (!newData.next) {
//       setShouldFetch(false);
//       return;
//     }
//     setPage(newData.next);
//     setShouldFetch(true);
//   }, [fetcher.data]);
//
//   const divHeight = useCallback(
//     (node) => {
//       if (!node) return;
//       setHeight(node.getBoundingClientRect().height);
//     },
//     [profiles.length],
//   );
//
//   return (
//     <>
//       {(Array.isArray(profiles)
//         && profiles.length
//         && profiles?.map((x: Profile) => (
//           <div key={x.id} ref={divHeight}>
//             <h3>
//               {x.first_name} {x.last_name} - {x.id}
//             </h3>
//             <p>{x.gender}</p>
//           </div>
//         ))) ?? <div>Infinite scrolls works</div>}
//     </>
//   );
// }
//
// export default InfiniteScrolls;
