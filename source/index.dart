import 'dart:async';

class ConcatStream<T> extends StreamView<T> {
  ConcatStream(Iterable<Stream<T>> streams)
      : super(_buildController(streams).stream);

  static StreamController<T> _buildController<T>(Iterable<Stream<T>> streams) {
    final controller = StreamController<T>(sync: true);
    StreamSubscription<T>? subscription;

    controller.onListen = () {
      final iterator = streams.iterator;

      void moveNext() {
        if (!iterator.moveNext()) {
          controller.close();
          return;
        }
        subscription?.cancel();
        subscription = iterator.current.listen(controller.add,
            onError: controller.addError, onDone: moveNext);
      }

      moveNext();
    };
    controller.onPause = () => subscription?.pause();
    controller.onResume = () => subscription?.resume();
    controller.onCancel = () => subscription?.cancel();

    return controller;
  }
}

extension ConcatExtensions<T> on Stream<T> {
  Stream<T> concatWith(Iterable<Stream<T>> other) {
    final concatStream = ConcatStream<T>([this, ...other]);

    return isBroadcast
        ? concatStream.asBroadcastStream(onCancel: (s) => s.cancel())
        : concatStream;
  }
}