## Version and local caches

We can point to a specific file in a specific version of a module with:

    name@version:path

with, optionally, provider information:

    npm:name@version:path

Additionally we can refer to a range of version:

    name@~version:path

or a tag:

    name@tag:path


Locally we maintain a map from these special versions to a specific version, mapped during runtime:

    actual-version = _ver.map[name][version] 
    cache[name][actual-version][path]

or, store directly in cache:

    cache[name][version][path]

Alternatively, we can lookup a version that accepted by the given version range:

    for cached-version of cache[name] => if semver.fit cached-version, version => version = cached-version

if all of these don't work, we have to request a remote resource via `registry` based on the given {name, version, path} pair:

    registry {name, version, path} .then ({content, version}) -> {actual-version: version, ...}


Once we get the actual-version, we can use it to setup our cache:

    _ver.map[name][version] = actual-version
    cache[name][actual-version][path] = content
    cache[name][version][path] = content

