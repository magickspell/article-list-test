import React, {useEffect, useState} from "react";
import {DataProvider} from "./api/provider";
import {Loader} from "./components/Loader";

export const App = () => {

    // for loader logic
    let [loading, setLoading] = useState(true)

    // set posts from server to default
    let [postsDefault, setPostsDefault] = useState([])
    useEffect(() => {
        if (postsDefault.length === 0) {
            let postsData = DataProvider.getPosts()
            let usersData = DataProvider.getUsers()
            Promise.all([postsData, usersData])
                .then((res) => {
                    let usersArr = res[1].data.map(i => {
                        return {id: i.id, name: i.name}
                    })
                    let postsArr = res[0].data.map(i => {
                        return {
                            ...i,
                            userName: usersArr.filter(x => {
                                return x.id === i.userId
                            })[0].name
                        }
                    })
                    setPostsDefault(postsArr)
                    setLoading(false)
                })
        }
    }, [])


    let [posts, setPosts] = useState([])
    useEffect(() => {
        if (postsDefault.length > 0) {
            setPosts(postsDefault)
        }
    }, [postsDefault])

    // filter posts (commented code can be changed to button or useEffect logic)
    let [filter, setFilter] = useState(``)
    useEffect(() => {
        if (filter.length === 0) { // if filter cleared - reset posts to default
            setPosts(postsDefault)
        } /*else {
            let result = postsDefault.filter((i) => {
                return i.userName.indexOf(filter) !== -1
            })
            setPosts(result)
        }*/
    }, [filter])
    const FilterFunc = () => {
        if (filter.length === 0) {
            setPosts(postsDefault)
        } else {
            let result = postsDefault.filter((i) => {
                return i.userName.indexOf(filter) !== -1
            })
            setPosts(result)
        }
    }

    return (
        <div className={"wrapper"}>

            {
                loading
                    ? <Loader/>
                    : <div className={"app"}>

                        <div className={"app__filter"}>
                            <button
                                onClick={
                                    () => {
                                        FilterFunc()
                                    }
                                }
                            >&#128269;</button>
                            <input
                                value={filter}
                                onChange={(e) => {
                                    setFilter(e.currentTarget.value)
                                }
                                }
                                type="text"
                                placeholder={"Filter by author..."}
                            />
                        </div>

                        <div className={"app__content"}>
                            <div className={"app__list"}>
                                {
                                    posts.length > 0
                                        ? posts.map((i) => {
                                            return (
                                                <div
                                                    className={"app__list__item"}
                                                    key={"app__list__item" + i.id}
                                                >
                                                    <p
                                                        className={"app__list__item__title"}
                                                        key={"app__list__item__title" + i.id}
                                                    >
                                                        <b>{i.title}</b>
                                                    </p>
                                                    <p
                                                        className={"app__list__item__text"}
                                                        key={"app__list__item__text" + i.id}
                                                    >
                                                        {i.body}
                                                    </p>
                                                    <p
                                                        className={"app__list__item__author"}
                                                        key={"app__list__item__author" + i.id}
                                                    >
                                                        {i.userName}
                                                    </p>
                                                </div>
                                            )
                                        })
                                        : `no posts`
                                }
                            </div>
                        </div>

                    </div>
            }


        </div>
    )
}
